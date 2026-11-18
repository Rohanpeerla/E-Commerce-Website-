"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import ReviewStars from "./ReviewStars";
import { formatINR } from "@/lib/currency";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  brand?: string | null;
  shortDescription?: string | null;
  avgRating?: number;
  reviewCount?: number;
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  image,
  brand,
  shortDescription,
  avgRating = 0,
  reviewCount = 0,
}: ProductCardProps) {
  const { addItem } = useCart();
  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 flex flex-col">
      {/* Image */}
      <Link href={`/products/${slug}`} className="relative block aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {brand && (
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">
            {brand}
          </p>
        )}
        <Link href={`/products/${slug}`}>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors leading-snug">
            {name}
          </h3>
        </Link>
        {shortDescription && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{shortDescription}</p>
        )}

        {reviewCount > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <ReviewStars rating={avgRating} size="sm" />
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatINR(price)}
            </span>
            {compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatINR(compareAtPrice)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({ id, name, price, image, slug });
            }}
            className="p-2.5 bg-gray-100 hover:bg-indigo-600 text-gray-600 hover:text-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Add to cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
