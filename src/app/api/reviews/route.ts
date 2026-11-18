import { db } from "@/db";
import { reviews } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, author, rating, title, content } = body;

    if (!productId || !author || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        review: {
          id: Math.floor(Math.random() * 100000) + 1,
          productId,
          author,
          rating,
          title: title || null,
          content: content || null,
          verified: false,
          createdAt: new Date().toISOString(),
        },
      });
    }

    const [review] = await db
      .insert(reviews)
      .values({
        productId,
        author,
        rating,
        title: title || null,
        content: content || null,
        verified: false,
      })
      .returning();

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Review API error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
