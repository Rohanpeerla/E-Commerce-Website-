"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import BackButton from "@/components/BackButton";
import CategoryFilter from "@/components/CategoryFilter";

interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  brand: string | null;
  image: string;
  avgRating: number;
  reviewCount: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "featured";
  const brand = searchParams.get("brand") || "";
  const search = searchParams.get("search") || "";

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (sort) params.set("sort", sort);
      if (brand) params.set("brand", brand);
      if (search) params.set("search", search);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setCategories(data.filters?.categories || []);
      setBrands(data.filters?.brands || []);
    } catch {
      setProducts([]);
    }
    setLoading(false);
  }, [category, sort, brand, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/products");
  };

  const activeFiltersCount =
    (category ? 1 : 0) + (brand ? 1 : 0) + (search ? 1 : 0);

  const currentCategoryName =
    categories.find((c) => c.slug === category)?.name || "All Products";

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <BackButton label="Back" />

        {/* Header */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <a href="/" className="hover:text-gray-600 transition-colors">Home</a>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{currentCategoryName}</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            {currentCategoryName}
          </h1>
          <p className="mt-2 text-gray-500">
            {loading
              ? "Loading products..."
              : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="mb-8">
          <CategoryFilter />
        </div>

        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 w-full py-3 px-4 bg-white border border-gray-200 rounded-xl mb-4 text-sm font-medium text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters &amp; Brand
            {activeFiltersCount > 0 && (
              <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`${
              filtersOpen ? "block" : "hidden"
            } lg:block mb-6 lg:mb-0`}
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Categories (sidebar) */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => updateFilter("category", "")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !category
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter("category", cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat.slug
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              {brands.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Brand</h4>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => updateFilter("brand", "")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !brand
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      All Brands
                    </button>
                    {brands.map((b) => (
                      <button
                        key={b}
                        onClick={() => updateFilter("brand", b)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          brand === b
                            ? "bg-indigo-50 text-indigo-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                {category && (
                  <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    {currentCategoryName}
                    <button onClick={() => updateFilter("category", "")} className="hover:text-indigo-900">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {brand && (
                  <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    {brand}
                    <button onClick={() => updateFilter("brand", "")} className="hover:text-indigo-900">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>

              <select
                value={sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                    <div className="aspect-[4/3] skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 skeleton rounded w-16" />
                      <div className="h-4 skeleton rounded w-3/4" />
                      <div className="h-3 skeleton rounded w-1/2" />
                      <div className="h-6 skeleton rounded w-24 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsClient() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
          <div className="h-8 skeleton rounded w-48 mb-4" />
          <div className="h-4 skeleton rounded w-32 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <div className="aspect-[4/3] skeleton" />
                <div className="p-4 space-y-3">
                  <div className="h-4 skeleton rounded w-3/4" />
                  <div className="h-6 skeleton rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
