import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Store<span className="text-indigo-400">Checkd</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Premium tech at competitive prices. Your trusted source for laptops, phones, tablets, and more.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: "All Products", href: "/products" },
                { label: "Laptops", href: "/products?category=laptops" },
                { label: "MacBooks", href: "/products?category=macbooks" },
                { label: "iPhones", href: "/products?category=iphones" },
                { label: "iPads", href: "/products?category=ipads" },
                { label: "Tablets", href: "/products?category=tablets" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <span className="text-sm hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              {["Help Center", "Shipping", "Returns", "Warranty", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <span className="text-sm hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} StoreCheckd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Twitter", "Instagram", "YouTube", "LinkedIn"].map((social) => (
              <span key={social} className="text-sm hover:text-white transition-colors cursor-pointer">
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
