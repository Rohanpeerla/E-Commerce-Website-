import { db } from "@/db";
import { orders } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      items,
    } = body;

    if (!email || !firstName || !lastName || !address || !city || !zipCode || !country || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const total = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        order: {
          id: Math.floor(Math.random() * 100000) + 1,
          email,
          firstName,
          lastName,
          address,
          city,
          state: state || "",
          zipCode,
          country,
          phone: phone || "",
          total: total.toFixed(2),
          items,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        },
        success: true,
      });
    }

    const [order] = await db
      .insert(orders)
      .values({
        email,
        firstName,
        lastName,
        address,
        city,
        state: state || "",
        zipCode,
        country,
        phone: phone || "",
        total: total.toFixed(2),
        items,
        status: "confirmed",
      })
      .returning();

    return NextResponse.json({ order, success: true });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
