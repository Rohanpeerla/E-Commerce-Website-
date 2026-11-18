import { db } from "@/db";
import { products, categories, reviews } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    // Featured products
    const featuredProducts = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        shortDescription: products.shortDescription,
        price: products.price,
        compareAtPrice: products.compareAtPrice,
        brand: products.brand,
        images: products.images,
      })
      .from(products)
      .where(eq(products.featured, true))
      .orderBy(desc(products.createdAt))
      .limit(8);

    // Categories
    const cats = await db.select().from(categories);

    // Review stats
    const reviewStats = await db
      .select({
        productId: reviews.productId,
        avgRating: sql<number>`ROUND(AVG(${reviews.rating}), 1)`,
        count: sql<number>`COUNT(*)::int`,
      })
      .from(reviews)
      .groupBy(reviews.productId);

    const statsMap = new Map(
      reviewStats.map((s) => [s.productId, { avgRating: Number(s.avgRating), count: s.count }])
    );

    // Latest products
    const latestProducts = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        shortDescription: products.shortDescription,
        price: products.price,
        compareAtPrice: products.compareAtPrice,
        brand: products.brand,
        images: products.images,
      })
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(8);

    const mapProduct = (p: typeof featuredProducts[number]) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      shortDescription: p.shortDescription,
      price: Number(p.price),
      compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
      brand: p.brand,
      image: (p.images as string[])[0] || "",
      avgRating: statsMap.get(p.id)?.avgRating || 0,
      reviewCount: statsMap.get(p.id)?.count || 0,
    });

    return {
      featured: featuredProducts.map(mapProduct),
      latest: latestProducts.map(mapProduct),
      categories: cats,
    };
  } catch {
    return { featured: [], latest: [], categories: [] };
  }
}

export default async function HomePage() {
  const data = await getData();

  return <HomeClient data={data} />;
}
