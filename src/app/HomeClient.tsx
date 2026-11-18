"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

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
  description: string | null;
  image: string | null;
}

interface HomeData {
  featured: Product[];
  latest: Product[];
  categories: Category[];
}

export default function HomeClient({ data }: { data: HomeData }) {
  const [seeded, setSeeded] = useState(data.featured.length > 0);
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      if (res.ok) {
        setSeeded(true);
        window.location.reload();
      }
    } catch {
      // ignore
    }
    setSeeding(false);
  };

  // Auto-seed if empty
  useEffect(() => {
    if (!seeded && !seeding && data.featured.length === 0) {
      handleSeed();
    }
  }, []);

  if (!seeded || data.featured.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center animate-float">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Setting up StoreCheckd...</h1>
        <p className="text-gray-500">Loading demo products and reviews</p>
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        {!seeding && (
          <button
            onClick={handleSeed}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
          >
            Seed Database
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50 pt-24 lg:pt-32 pb-16 lg:pb-24">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-indigo-700">New arrivals just dropped</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Premium Tech,
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Unmatched Value
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
                Discover the latest laptops, MacBooks, iPhones, iPads, and more.
                Curated tech from trusted brands at prices you&apos;ll love.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5"
                >
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/products?category=macbooks"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                >
                  Explore MacBooks
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex items-center gap-8">
                {[
                  { icon: "🚚", label: "Free Shipping" },
                  { icon: "🔒", label: "Secure Checkout" },
                  { icon: "↩️", label: "30-Day Returns" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2">
                    <span className="text-xl">{badge.icon}</span>
                    <span className="text-sm font-medium text-gray-600">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Grid */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up animation-delay-200 aspect-[3/4]">
                    <img
                      src="https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                      alt="MacBook Pro"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl animate-fade-in-up animation-delay-400 aspect-square">
                    <img
                      src="https://images.pexels.com/photos/16005007/pexels-photo-16005007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                      alt="iPhone"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-xl animate-fade-in-up animation-delay-300 aspect-square">
                    <img
                      src="https://images.pexels.com/photos/8024027/pexels-photo-8024027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                      alt="iPad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up animation-delay-500 aspect-[3/4]">
                    <img
                      src="https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                      alt="Laptop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Trusted by 50K+</p>
                    <p className="text-xs text-gray-500">Happy customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              Find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm lg:text-base">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Featured Products
              </h2>
              <p className="mt-3 text-gray-500 text-lg">
                Hand-picked favorites, loved by our customers
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.featured.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="sm:hidden text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
            Upgrade Your Tech Game
          </h2>
          <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
            Free shipping on orders over ₹25,000. Plus, get extended warranty on all Apple products.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-0.5"
          >
            Shop the Sale
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                New Arrivals
              </h2>
              <p className="mt-3 text-gray-500 text-lg">
                The latest additions to our collection
              </p>
            </div>
            <Link
              href="/products?sort=newest"
              className="hidden sm:inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              See All New
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.latest.slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Stay in the Loop
          </h2>
          <p className="mt-3 text-gray-500">
            Get notified about new products, exclusive deals, and tech tips.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="px-8 py-3.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
