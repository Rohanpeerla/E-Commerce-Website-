import { db } from "@/db";
import { products, categories, reviews } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_REVIEWS,
  getProductStats,
} from "@/lib/mockData";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Fallback to mock data if DATABASE_URL is not configured
  if (!process.env.DATABASE_URL) {
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const category =
      MOCK_CATEGORIES.find((c) => c.slug === product.categorySlug) || null;

    const productReviews = MOCK_REVIEWS.filter((r) => r.productSlug === slug);
    const stats = getProductStats(slug);

    const related = MOCK_PRODUCTS.filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id
    )
      .slice(0, 4)
      .map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        price: r.price,
        compareAtPrice: r.compareAtPrice,
        brand: r.brand,
        images: r.images,
        shortDescription: r.shortDescription,
        image: r.images[0] || "",
      }));

    return NextResponse.json({
      product: {
        ...product,
        inStock: true,
      },
      category,
      reviews: productReviews,
      reviewStats: {
        avgRating: stats.avgRating,
        count: stats.reviewCount,
      },
      relatedProducts: related,
    });
  }

  try {
    const productList = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        shortDescription: products.shortDescription,
        price: products.price,
        compareAtPrice: products.compareAtPrice,
        brand: products.brand,
        sku: products.sku,
        inStock: products.inStock,
        featured: products.featured,
        images: products.images,
        specs: products.specs,
        categoryId: products.categoryId,
      })
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    if (productList.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = productList[0];

    // Get category
    let category = null;
    if (product.categoryId) {
      const cats = await db
        .select()
        .from(categories)
        .where(eq(categories.id, product.categoryId))
        .limit(1);
      if (cats.length > 0) category = cats[0];
    }

    // Get reviews
    const productReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, product.id))
      .orderBy(desc(reviews.createdAt));

    // Get review stats
    const stats = await db
      .select({
        avgRating: sql<number>`COALESCE(ROUND(AVG(${reviews.rating}), 1), 0)`,
        count: sql<number>`COUNT(*)::int`,
      })
      .from(reviews)
      .where(eq(reviews.productId, product.id));

    // Get related products
    const related = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        price: products.price,
        compareAtPrice: products.compareAtPrice,
        brand: products.brand,
        images: products.images,
        shortDescription: products.shortDescription,
      })
      .from(products)
      .where(
        product.categoryId
          ? eq(products.categoryId, product.categoryId)
          : undefined
      )
      .limit(5);

    const relatedFiltered = related
      .filter((r) => r.id !== product.id)
      .slice(0, 4)
      .map((r) => ({
        ...r,
        price: Number(r.price),
        compareAtPrice: r.compareAtPrice ? Number(r.compareAtPrice) : null,
        image: (r.images as string[])[0] || "",
      }));

    return NextResponse.json({
      product: {
        ...product,
        price: Number(product.price),
        compareAtPrice: product.compareAtPrice
          ? Number(product.compareAtPrice)
          : null,
      },
      category,
      reviews: productReviews,
      reviewStats: {
        avgRating: Number(stats[0]?.avgRating || 0),
        count: stats[0]?.count || 0,
      },
      relatedProducts: relatedFiltered,
    });
  } catch (error) {
    console.error("Product detail API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
