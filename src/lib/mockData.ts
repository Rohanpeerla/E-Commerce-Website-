export interface MockCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface MockProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number | null;
  categorySlug: string;
  brand: string;
  sku: string;
  featured: boolean;
  images: string[];
  specs: Record<string, string>;
}

export interface MockReview {
  id: number;
  productSlug: string;
  productId?: number;
  author: string;
  rating: number;
  title: string | null;
  content: string | null;
  verified: boolean;
  createdAt: string;
}

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: 1,
    name: "Laptops",
    slug: "laptops",
    description: "Powerful laptops for work and play",
    image: "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 2,
    name: "MacBooks",
    slug: "macbooks",
    description: "Apple MacBook lineup — power meets elegance",
    image: "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 3,
    name: "iPhones",
    slug: "iphones",
    description: "The latest iPhones with cutting-edge features",
    image: "https://images.pexels.com/photos/16005007/pexels-photo-16005007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 4,
    name: "Phones",
    slug: "phones",
    description: "Premium smartphones from top brands",
    image: "https://images.pexels.com/photos/10883732/pexels-photo-10883732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 5,
    name: "iPads",
    slug: "ipads",
    description: "Apple iPads for creativity and productivity",
    image: "https://images.pexels.com/photos/8024027/pexels-photo-8024027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: 6,
    name: "Tablets",
    slug: "tablets",
    description: "Versatile tablets for every need",
    image: "https://images.pexels.com/photos/8533366/pexels-photo-8533366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Max',
    slug: "macbook-pro-16-m3-max",
    description:
      "The most powerful MacBook Pro ever. Featuring the M3 Max chip with a 16-core CPU and up to 40-core GPU, this machine handles the most demanding pro workflows with ease. The stunning 16.2-inch Liquid Retina XDR display delivers extreme dynamic range and incredible contrast. Up to 22 hours of battery life lets you power through your day without compromise.",
    shortDescription: "M3 Max chip, 16.2\" Liquid Retina XDR, 36GB RAM",
    price: 299900,
    compareAtPrice: 329900,
    categorySlug: "macbooks",
    brand: "Apple",
    sku: "MBP16-M3MAX-36",
    featured: true,
    images: [
      "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Apple M3 Max",
      Memory: "36GB Unified Memory",
      Storage: "1TB SSD",
      Display: '16.2" Liquid Retina XDR',
      Battery: "Up to 22 hours",
      Weight: "2.14 kg",
    },
  },
  {
    id: 2,
    name: 'MacBook Air 15" M3',
    slug: "macbook-air-15-m3",
    description:
      "Impossibly thin and incredibly capable. The 15-inch MacBook Air with M3 chip brings extraordinary performance to everyday tasks. Its breathtakingly thin design, vibrant display, and all-day battery life make it the perfect laptop for everything you do.",
    shortDescription: "M3 chip, 15.3\" Liquid Retina, 16GB RAM",
    price: 134900,
    compareAtPrice: 149900,
    categorySlug: "macbooks",
    brand: "Apple",
    sku: "MBA15-M3-16",
    featured: true,
    images: [
      "https://images.pexels.com/photos/249538/pexels-photo-249538.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Apple M3",
      Memory: "16GB Unified Memory",
      Storage: "512GB SSD",
      Display: '15.3" Liquid Retina',
      Battery: "Up to 18 hours",
      Weight: "1.51 kg",
    },
  },
  {
    id: 3,
    name: 'MacBook Pro 14" M3 Pro',
    slug: "macbook-pro-14-m3-pro",
    description:
      "Built for demanding workflows. The 14-inch MacBook Pro with M3 Pro chip features a 12-core CPU and 18-core GPU, delivering exceptional performance for creative professionals. The Liquid Retina XDR display with ProMotion technology provides a stunningly responsive experience.",
    shortDescription: "M3 Pro chip, 14.2\" Liquid Retina XDR, 18GB RAM",
    price: 199900,
    compareAtPrice: null,
    categorySlug: "macbooks",
    brand: "Apple",
    sku: "MBP14-M3PRO-18",
    featured: false,
    images: [
      "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Apple M3 Pro",
      Memory: "18GB Unified Memory",
      Storage: "512GB SSD",
      Display: '14.2" Liquid Retina XDR',
      Battery: "Up to 17 hours",
      Weight: "1.61 kg",
    },
  },
  {
    id: 4,
    name: "Dell XPS 15 (2024)",
    slug: "dell-xps-15-2024",
    description:
      "The Dell XPS 15 redefines premium computing with its InfinityEdge 3.5K OLED display that delivers vivid colors and deep blacks. Powered by 13th Gen Intel Core i7 processor with 32GB RAM, it handles intensive multitasking and creative work effortlessly.",
    shortDescription: "Intel Core i7, 15.6\" 3.5K OLED, 32GB RAM",
    price: 159999,
    compareAtPrice: 179999,
    categorySlug: "laptops",
    brand: "Dell",
    sku: "XPS15-2024-32",
    featured: true,
    images: [
      "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Intel Core i7-13700H",
      Memory: "32GB DDR5",
      Storage: "1TB NVMe SSD",
      Display: '15.6" 3.5K OLED',
      Graphics: "NVIDIA RTX 4060",
      Weight: "1.86 kg",
    },
  },
  {
    id: 5,
    name: "ThinkPad X1 Carbon Gen 12",
    slug: "thinkpad-x1-carbon-gen12",
    description:
      "The gold standard for business laptops. Ultra-light carbon fiber chassis, stunning 14-inch 2.8K OLED display, and legendary keyboard with Intel Core Ultra AI processing.",
    shortDescription: "Intel Core Ultra 7, 14\" 2.8K OLED, 32GB RAM",
    price: 149990,
    compareAtPrice: null,
    categorySlug: "laptops",
    brand: "Lenovo",
    sku: "X1C-G12-32",
    featured: false,
    images: [
      "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Intel Core Ultra 7 155U",
      Memory: "32GB LPDDR5x",
      Storage: "1TB SSD",
      Display: '14" 2.8K OLED',
      Battery: "Up to 15 hours",
      Weight: "1.08 kg",
    },
  },
  {
    id: 6,
    name: "ASUS ROG Zephyrus G16",
    slug: "asus-rog-zephyrus-g16",
    description:
      "Dominate any game with the ROG Zephyrus G16. Featuring Intel Core i9 and NVIDIA GeForce RTX 4070 in a sleek chassis with 240Hz QHD display.",
    shortDescription: "Intel Core i9, RTX 4070, 16\" 240Hz QHD",
    price: 184990,
    compareAtPrice: 209990,
    categorySlug: "laptops",
    brand: "ASUS",
    sku: "ROG-Z-G16-I9",
    featured: true,
    images: [
      "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Intel Core i9-14900HX",
      Memory: "32GB DDR5",
      Storage: "2TB NVMe SSD",
      Display: '16" QHD 240Hz',
      Graphics: "NVIDIA RTX 4070",
      Weight: "1.85 kg",
    },
  },
  {
    id: 7,
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    description:
      "iPhone 15 Pro Max features a strong and light titanium design with textured matte finish. The A17 Pro chip powers pro gaming and advanced camera capabilities with 5x telephoto optical zoom.",
    shortDescription: "A17 Pro chip, 48MP camera, Titanium design",
    price: 159900,
    compareAtPrice: null,
    categorySlug: "iphones",
    brand: "Apple",
    sku: "IP15PM-256-NT",
    featured: true,
    images: [
      "https://images.pexels.com/photos/16005007/pexels-photo-16005007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/6370366/pexels-photo-6370366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "A17 Pro",
      Display: '6.7" Super Retina XDR',
      Camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      Storage: "256GB",
      Battery: "Up to 29 hours video playback",
    },
  },
  {
    id: 8,
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description:
      "Welcome to the AI era of smartphones. Galaxy AI built-in, titanium frame, 200MP camera system, and embedded S Pen for productivity.",
    shortDescription: "Snapdragon 8 Gen 3, 200MP camera, S Pen",
    price: 129999,
    compareAtPrice: null,
    categorySlug: "phones",
    brand: "Samsung",
    sku: "SGS24U-256-TI",
    featured: true,
    images: [
      "https://images.pexels.com/photos/10883732/pexels-photo-10883732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/7537256/pexels-photo-7537256.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/5099869/pexels-photo-5099869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Snapdragon 8 Gen 3",
      Display: '6.8" Dynamic AMOLED 2X',
      Camera: "200MP + 50MP + 12MP + 10MP",
      Storage: "256GB",
      Battery: "5,000mAh",
    },
  },
  {
    id: 9,
    name: 'iPad Pro 12.9" M2',
    slug: "ipad-pro-12-9-m2",
    description:
      "The ultimate iPad experience. Features Apple M2 chip, Liquid Retina XDR display with ProMotion, and Apple Pencil hover support.",
    shortDescription: "M2 chip, 12.9\" Liquid Retina XDR, ProMotion",
    price: 112900,
    compareAtPrice: null,
    categorySlug: "ipads",
    brand: "Apple",
    sku: "IPP129-M2-128",
    featured: true,
    images: [
      "https://images.pexels.com/photos/8024027/pexels-photo-8024027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/8533362/pexels-photo-8533362.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/3184343/pexels-photo-3184343.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Apple M2",
      Display: '12.9" Liquid Retina XDR',
      Storage: "128GB",
      Camera: "12MP Wide + 10MP Ultra Wide",
    },
  },
  {
    id: 10,
    name: "Samsung Galaxy Tab S9 Ultra",
    slug: "samsung-galaxy-tab-s9-ultra",
    description:
      "Massive 14.6-inch Dynamic AMOLED 2X display with 120Hz refresh rate. Snapdragon 8 Gen 2 for Galaxy and IP68 water resistance with S Pen included.",
    shortDescription: "Snapdragon 8 Gen 2, 14.6\" AMOLED, S Pen",
    price: 108999,
    compareAtPrice: null,
    categorySlug: "tablets",
    brand: "Samsung",
    sku: "GTS9U-256-GR",
    featured: false,
    images: [
      "https://images.pexels.com/photos/8533362/pexels-photo-8533362.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/2647376/pexels-photo-2647376.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/8533366/pexels-photo-8533366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Snapdragon 8 Gen 2",
      Display: '14.6" Dynamic AMOLED 2X',
      Storage: "256GB",
      Camera: "13MP + 8MP",
      Battery: "11,200mAh",
    },
  },
  {
    id: 11,
    name: "Microsoft Surface Pro 10",
    slug: "microsoft-surface-pro-10",
    description:
      "Combines the versatility of a tablet with the power of a laptop. Intel Core Ultra processors, PixelSense Flow display, and Copilot+ PC features.",
    shortDescription: "Intel Core Ultra, 13\" PixelSense, Windows 11",
    price: 134999,
    compareAtPrice: 149999,
    categorySlug: "tablets",
    brand: "Microsoft",
    sku: "SP10-256-PT",
    featured: true,
    images: [
      "https://images.pexels.com/photos/2647376/pexels-photo-2647376.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/3184343/pexels-photo-3184343.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/8533366/pexels-photo-8533366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Intel Core Ultra 7",
      Display: '13" PixelSense Flow',
      Storage: "256GB SSD",
      Battery: "Up to 14 hours",
      Weight: "0.88 kg",
    },
  },
  {
    id: 12,
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    description:
      "Google Tensor G3 chip and industry-leading camera with Magic Eraser, Best Take, and 7 years of OS updates.",
    shortDescription: "Tensor G3, 50MP camera, 7 years of updates",
    price: 84999,
    compareAtPrice: 99999,
    categorySlug: "phones",
    brand: "Google",
    sku: "PX8P-128-OB",
    featured: false,
    images: [
      "https://images.pexels.com/photos/5099869/pexels-photo-5099869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/10883732/pexels-photo-10883732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      "https://images.pexels.com/photos/7537256/pexels-photo-7537256.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    ],
    specs: {
      Processor: "Google Tensor G3",
      Display: '6.7" LTPO OLED',
      Camera: "50MP + 48MP + 48MP",
      Storage: "128GB",
      Battery: "5,050mAh",
    },
  },
];

export const MOCK_REVIEWS: MockReview[] = [
  {
    id: 1,
    productSlug: "macbook-pro-16-m3-max",
    author: "Arjun T.",
    rating: 5,
    title: "Absolute beast of a machine",
    content: "I use this for video editing and 3D rendering. The M3 Max handles everything smoothly.",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    productSlug: "macbook-air-15-m3",
    author: "Sneha L.",
    rating: 5,
    title: "Best laptop I've ever owned",
    content: "The perfect balance of power and portability. Battery easily lasts the entire day.",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    productSlug: "iphone-15-pro-max",
    author: "Lisa R.",
    rating: 5,
    title: "The best iPhone yet",
    content: "The titanium design is gorgeous and noticeably lighter. Camera system is incredible.",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    productSlug: "samsung-galaxy-s24-ultra",
    author: "Tarun J.",
    rating: 5,
    title: "Galaxy AI is incredible",
    content: "The AI features are genuinely useful and the 200MP camera captures amazing detail.",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    productSlug: "dell-xps-15-2024",
    author: "Karthik C.",
    rating: 5,
    title: "Stunning OLED display",
    content: "The 3.5K OLED display is breathtaking. Colors are accurate for creative work.",
    verified: true,
    createdAt: new Date().toISOString(),
  },
];

// Helper to compute stats
export function getProductStats(productSlug: string) {
  const reviews = MOCK_REVIEWS.filter((r) => r.productSlug === productSlug);
  if (reviews.length === 0) return { avgRating: 4.8, reviewCount: 12 };
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    avgRating: Number(avg.toFixed(1)),
    reviewCount: reviews.length,
  };
}

export function getMockHomeData() {
  const mapProduct = (p: MockProduct) => {
    const stats = getProductStats(p.slug);
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      shortDescription: p.shortDescription,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      brand: p.brand,
      image: p.images[0] || "",
      avgRating: stats.avgRating,
      reviewCount: stats.reviewCount,
    };
  };

  return {
    featured: MOCK_PRODUCTS.filter((p) => p.featured).map(mapProduct),
    latest: MOCK_PRODUCTS.map(mapProduct).slice(0, 8),
    categories: MOCK_CATEGORIES,
  };
}
