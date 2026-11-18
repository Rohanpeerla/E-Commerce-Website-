"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CATEGORIES = [
  { label: "All", slug: "", icon: "🛍️" },
  { label: "Laptops", slug: "laptops", icon: "💻" },
  { label: "MacBooks", slug: "macbooks", icon: "🍎" },
  { label: "Phones", slug: "phones", icon: "📱" },
  { label: "iPhones", slug: "iphones", icon: "📲" },
  { label: "iPads", slug: "ipads", icon: "📋" },
  { label: "Tablets", slug: "tablets", icon: "🖥️" },
];

function CategoryFilterInner({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  const searchParams = useSearchParams();

  const buildHref = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    const qs = params.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  };

  const current = activeCategory ?? searchParams.get("category") ?? "";

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
      {CATEGORIES.map((cat) => {
        const isActive = current === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={buildHref(cat.slug)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 flex-shrink-0 ${
              isActive
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            <span className="text-base leading-none">{cat.icon}</span>
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}

export default function CategoryFilter({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.slug}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-gray-200 bg-white text-gray-400 flex-shrink-0"
            >
              <span className="text-base leading-none">{cat.icon}</span>
              {cat.label}
            </span>
          ))}
        </div>
      }
    >
      <CategoryFilterInner activeCategory={activeCategory} />
    </Suspense>
  );
}
