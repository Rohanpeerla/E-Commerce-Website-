import { db } from "@/db";
import { products, categories, reviews } from "@/db/schema";
import { eq, ilike, sql, and, desc, asc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  getProductStats,
} from "@/lib/mockData";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "featured";
  const brand = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // Fallback to mock data if DATABASE_URL is not configured
  if (!process.env.DATABASE_URL) {
    let list = [...MOCK_PRODUCTS];

    if (category) {
      list = list.filter((p) => p.categorySlug === category);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (brand) {
      list = list.filter((p) => p.brand === brand);
    }
    if (minPrice) {
      list = list.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    const result = list.map((p) => {
      const stats = getProductStats(p.slug);
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        shortDescription: p.shortDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        brand: p.brand,
        featured: p.featured,
        images: p.images,
        image: p.images[0] || "",
        avgRating: stats.avgRating,
        reviewCount: stats.reviewCount,
      };
    });

    const brands = Array.from(
      new Set(MOCK_PRODUCTS.map((p) => p.brand))
    ).filter(Boolean);

    return NextResponse.json({
      products: result,
      filters: {
        brands,
        categories: MOCK_CATEGORIES,
      },
    });
  }

  try {
    const conditions = [];

    if (category) {
      const cat = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, category))
        .limit(1);
      if (cat.length > 0) {
        conditions.push(eq(products.categoryId, cat[0].id));
      }
    }

    if (search) {
      conditions.push(ilike(products.name, `%${search}%`));
    }

    if (brand) {
      conditions.push(eq(products.brand, brand));
    }

    if (minPrice) {
      conditions.push(sql`${products.price}::numeric >= ${Number(minPrice)}`);
    }

    if (maxPrice) {
      conditions.push(sql`${products.price}::numeric <= ${Number(maxPrice)}`);
    }

    let orderBy;
    switch (sort) {
      case "price-asc":
        orderBy = asc(sql`${products.price}::numeric`);
        break;
      case "price-desc":
        orderBy = desc(sql`${products.price}::numeric`);
        break;
      case "newest":
        orderBy = desc(products.createdAt);
        break;
      case "name":
        orderBy = asc(products.name);
        break;
      default:
        orderBy = desc(products.featured);
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const productList = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        shortDescription: products.shortDescription,
        price: products.price,
        compareAtPrice: products.compareAtPrice,
        brand: products.brand,
        featured: products.featured,
        images: products.images,
        categoryId: products.categoryId,
      })
      .from(products)
      .where(where)
      .orderBy(orderBy);

    // Get review stats for each product
    const reviewStats = await db
      .select({
        productId: reviews.productId,
        avgRating: sql<number>`ROUND(AVG(${reviews.rating}), 1)`,
        count: sql<number>`COUNT(*)::int`,
      })
      .from(reviews)
      .groupBy(reviews.productId);

    const statsMap = new Map(
      reviewStats.map((s) => [s.productId, { avgRating: s.avgRating, count: s.count }])
    );

    const result = productList.map((p) => ({
      ...p,
      price: Number(p.price),
      compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
      image: (p.images as string[])[0] || "",
      avgRating: statsMap.get(p.id)?.avgRating || 0,
      reviewCount: statsMap.get(p.id)?.count || 0,
    }));

    // Get available brands for filters
    const brands = await db
      .selectDistinct({ brand: products.brand })
      .from(products)
      .where(where);

    // Get categories
    const cats = await db.select().from(categories);

    return NextResponse.json({
      products: result,
      filters: {
        brands: brands.map((b) => b.brand).filter(Boolean),
        categories: cats,
      },
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
