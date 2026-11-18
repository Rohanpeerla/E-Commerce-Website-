"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import ReviewStars from "@/components/ReviewStars";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";
import { formatINR } from "@/lib/currency";
import BackButton from "@/components/BackButton";
import CategoryFilter from "@/components/CategoryFilter";

interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  title: string | null;
  content: string | null;
  verified: boolean;
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  brand: string | null;
  sku: string | null;
  inStock: boolean;
  featured: boolean;
  images: string[];
  specs: Record<string, string>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  brand: string | null;
  image: string;
  shortDescription: string | null;
}

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState({ avgRating: 0, count: 0 });
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    author: "",
    rating: 5,
    title: "",
    content: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProduct(data.product);
        setCategory(data.category);
        setReviews(data.reviews);
        setReviewStats(data.reviewStats);
        setRelatedProducts(data.relatedProducts);
      } catch {
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: (product.images as string[])[0] || "",
        slug: product.slug,
      },
      quantity
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !reviewForm.author) return;
    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          ...reviewForm,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setReviews((prev) => [data.review, ...prev]);
        setReviewStats((prev) => ({
          avgRating:
            (prev.avgRating * prev.count + reviewForm.rating) /
            (prev.count + 1),
          count: prev.count + 1,
        }));
        setReviewForm({ author: "", rating: 5, title: "", content: "" });
        setShowReviewForm(false);
      }
    } catch {
      // ignore
    }
    setSubmittingReview(false);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="aspect-[4/3] skeleton rounded-2xl" />
          <div className="mt-8 lg:mt-0 space-y-4">
            <div className="h-4 skeleton rounded w-20" />
            <div className="h-8 skeleton rounded w-3/4" />
            <div className="h-4 skeleton rounded w-1/2" />
            <div className="h-10 skeleton rounded w-32 mt-6" />
            <div className="h-4 skeleton rounded w-full mt-8" />
            <div className="h-4 skeleton rounded w-full" />
            <div className="h-4 skeleton rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
        <p className="text-gray-500 mt-2">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/products"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <BackButton label="Back" />

        {/* Category quick-filter */}
        <div className="mb-6">
          <CategoryFilter activeCategory={category?.slug} />
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-gray-600 transition-colors">Products</Link>
          {category && (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link
                href={`/products?category=${category.slug}`}
                className="hover:text-gray-600 transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Image Gallery */}
          <ImageGallery
            images={product.images as string[]}
            productName={product.name}
          />

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            {product.brand && (
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                {product.brand}
              </p>
            )}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {reviewStats.count > 0 && (
              <div className="flex items-center gap-3 mt-3">
                <ReviewStars rating={reviewStats.avgRating} />
                <span className="text-sm text-gray-500">
                  {reviewStats.avgRating.toFixed(1)} ({reviewStats.count}{" "}
                  {reviewStats.count === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatINR(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatINR(product.compareAtPrice)}
                  </span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {product.shortDescription && (
              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Stock status */}
            <div className="mt-5 flex items-center gap-2">
              {product.inStock ? (
                <>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-green-700">In Stock</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <span className="text-sm font-medium text-red-700">Out of Stock</span>
                </>
              )}
              {product.sku && (
                <span className="text-sm text-gray-400 ml-4">SKU: {product.sku}</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 min-w-[200px] py-3.5 px-8 rounded-full font-semibold text-white transition-all shadow-lg ${
                  addedToCart
                    ? "bg-green-600 shadow-green-200"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300"
                } disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart!
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: "🚚", label: "Free Shipping", sub: "On orders ₹25,000+" },
                { icon: "🔄", label: "30-Day Returns", sub: "Hassle-free" },
                { icon: "🛡️", label: "Warranty", sub: "1 year included" },
              ].map((badge) => (
                <div key={badge.label} className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-semibold text-gray-900">{badge.label}</p>
                  <p className="text-xs text-gray-500">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description, Specs, Reviews */}
        <div className="mt-16">
          <div className="flex border-b border-gray-200 gap-1">
            {(
              [
                { key: "description", label: "Description" },
                { key: "specs", label: "Specifications" },
                { key: "reviews", label: `Reviews (${reviewStats.count})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="max-w-3xl prose prose-gray">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-2xl">
                <div className="bg-gray-50 rounded-2xl overflow-hidden">
                  {Object.entries(product.specs as Record<string, string>).map(
                    ([key, value], idx) => (
                      <div
                        key={key}
                        className={`flex justify-between px-6 py-4 ${
                          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-500">{key}</span>
                        <span className="text-sm font-semibold text-gray-900">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                {/* Review Summary */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-900">
                        {reviewStats.avgRating.toFixed(1)}
                      </p>
                      <ReviewStars rating={reviewStats.avgRating} />
                      <p className="text-sm text-gray-500 mt-1">
                        {reviewStats.count} review{reviewStats.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <form
                    onSubmit={handleSubmitReview}
                    className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-4"
                  >
                    <h3 className="font-semibold text-gray-900">Write Your Review</h3>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Rating
                      </label>
                      <ReviewStars
                        rating={reviewForm.rating}
                        size="lg"
                        interactive
                        onRate={(r) => setReviewForm({ ...reviewForm, rating: r })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.author}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, author: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={reviewForm.title}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, title: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Review
                      </label>
                      <textarea
                        rows={4}
                        value={reviewForm.content}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, content: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors disabled:bg-gray-300"
                      >
                        {submittingReview ? "Submitting..." : "Submit Review"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No reviews yet. Be the first to share your thoughts!
                    </p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                              {review.author.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {review.author}
                                {review.verified && (
                                  <span className="ml-2 text-xs text-green-600 font-normal">
                                    ✓ Verified Purchase
                                  </span>
                                )}
                              </p>
                              <ReviewStars rating={review.rating} size="sm" />
                            </div>
                          </div>
                        </div>
                        {review.title && (
                          <h4 className="text-sm font-semibold text-gray-900 mt-2">
                            {review.title}
                          </h4>
                        )}
                        {review.content && (
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            {review.content}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard
                  key={rp.id}
                  id={rp.id}
                  name={rp.name}
                  slug={rp.slug}
                  price={rp.price}
                  compareAtPrice={rp.compareAtPrice}
                  brand={rp.brand}
                  image={rp.image}
                  shortDescription={rp.shortDescription}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
