import { db } from "@/db";
import { categories, products, reviews } from "@/db/schema";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

const SEED_DATA = {
  categories: [
    {
      name: "Laptops",
      slug: "laptops",
      description: "Powerful laptops for work and play",
      image: "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    },
    {
      name: "MacBooks",
      slug: "macbooks",
      description: "Apple MacBook lineup — power meets elegance",
      image: "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    },
    {
      name: "iPhones",
      slug: "iphones",
      description: "The latest iPhones with cutting-edge features",
      image: "https://images.pexels.com/photos/16005007/pexels-photo-16005007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    },
    {
      name: "Phones",
      slug: "phones",
      description: "Premium smartphones from top brands",
      image: "https://images.pexels.com/photos/10883732/pexels-photo-10883732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    },
    {
      name: "iPads",
      slug: "ipads",
      description: "Apple iPads for creativity and productivity",
      image: "https://images.pexels.com/photos/8024027/pexels-photo-8024027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    },
    {
      name: "Tablets",
      slug: "tablets",
      description: "Versatile tablets for every need",
      image: "https://images.pexels.com/photos/8533366/pexels-photo-8533366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    },
  ],
  products: [
    // ──── MacBooks ────
    {
      name: 'MacBook Pro 16" M3 Max',
      slug: "macbook-pro-16-m3-max",
      description:
        "The most powerful MacBook Pro ever. Featuring the M3 Max chip with a 16-core CPU and up to 40-core GPU, this machine handles the most demanding pro workflows with ease. The stunning 16.2-inch Liquid Retina XDR display delivers extreme dynamic range and incredible contrast. Up to 22 hours of battery life lets you power through your day without compromise.",
      shortDescription: "M3 Max chip, 16.2\" Liquid Retina XDR, 36GB RAM",
      price: "299900.00",
      compareAtPrice: "329900.00",
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
      name: 'MacBook Air 15" M3',
      slug: "macbook-air-15-m3",
      description:
        "Impossibly thin and incredibly capable. The 15-inch MacBook Air with M3 chip brings extraordinary performance to everyday tasks. Its breathtakingly thin design, vibrant display, and all-day battery life make it the perfect laptop for everything you do.",
      shortDescription: "M3 chip, 15.3\" Liquid Retina, 16GB RAM",
      price: "134900.00",
      compareAtPrice: "149900.00",
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
      name: 'MacBook Pro 14" M3 Pro',
      slug: "macbook-pro-14-m3-pro",
      description:
        "Built for demanding workflows. The 14-inch MacBook Pro with M3 Pro chip features a 12-core CPU and 18-core GPU, delivering exceptional performance for creative professionals. The Liquid Retina XDR display with ProMotion technology provides a stunningly responsive experience.",
      shortDescription: "M3 Pro chip, 14.2\" Liquid Retina XDR, 18GB RAM",
      price: "199900.00",
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
    // ──── Laptops ────
    {
      name: "Dell XPS 15 (2024)",
      slug: "dell-xps-15-2024",
      description:
        "The Dell XPS 15 redefines premium computing with its InfinityEdge 3.5K OLED display that delivers vivid colors and deep blacks. Powered by 13th Gen Intel Core i7 processor with 32GB RAM, it handles intensive multitasking and creative work effortlessly. The precision-machined aluminum chassis is both beautiful and durable.",
      shortDescription: "Intel Core i7, 15.6\" 3.5K OLED, 32GB RAM",
      price: "159999.00",
      compareAtPrice: "179999.00",
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
      name: "ThinkPad X1 Carbon Gen 12",
      slug: "thinkpad-x1-carbon-gen12",
      description:
        "The gold standard for business laptops. The ThinkPad X1 Carbon Gen 12 continues the legendary ThinkPad tradition with its ultra-light carbon fiber chassis, stunning 14-inch 2.8K OLED display, and legendary keyboard. Intel Core Ultra processors deliver AI-enhanced performance for the modern workplace.",
      shortDescription: "Intel Core Ultra 7, 14\" 2.8K OLED, 32GB RAM",
      price: "149990.00",
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
      name: "ASUS ROG Zephyrus G16",
      slug: "asus-rog-zephyrus-g16",
      description:
        "Dominate any game with the ROG Zephyrus G16. Featuring the latest Intel Core i9 processor and NVIDIA GeForce RTX 4070, this gaming powerhouse delivers desktop-class performance in a sleek, portable design. The 16-inch 240Hz QHD display ensures buttery-smooth visuals.",
      shortDescription: "Intel Core i9, RTX 4070, 16\" 240Hz QHD",
      price: "184990.00",
      compareAtPrice: "209990.00",
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
      name: "HP Spectre x360 16 (2024)",
      slug: "hp-spectre-x360-16-2024",
      description:
        "The HP Spectre x360 16 is a stunning 2-in-1 convertible that blends premium design with powerful performance. Its 16-inch 3K+ OLED touchscreen with 120Hz refresh rate delivers breathtaking visuals. Powered by Intel Core Ultra 7 and 32GB RAM, it excels at creative workflows. The 360-degree hinge lets you switch between laptop, tent, and tablet modes effortlessly.",
      shortDescription: "Intel Core Ultra 7, 16\" 3K+ OLED, 32GB RAM",
      price: "139999.00",
      compareAtPrice: "159999.00",
      categorySlug: "laptops",
      brand: "HP",
      sku: "SPX360-16-U7",
      featured: true,
      images: [
        "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "Intel Core Ultra 7 155H",
        Memory: "32GB LPDDR5x",
        Storage: "1TB NVMe SSD",
        Display: '16" 3K+ OLED 120Hz Touchscreen',
        Graphics: "Intel Arc",
        Weight: "2.04 kg",
      },
    },
    {
      name: "Acer Predator Helios Neo 16",
      slug: "acer-predator-helios-neo-16",
      description:
        "Unleash your inner gamer with the Acer Predator Helios Neo 16. Built for serious gaming, it packs an Intel Core i9-14900HX processor and NVIDIA GeForce RTX 4060 GPU into a bold chassis. The 16-inch WQXGA IPS display with 165Hz refresh rate and 100% DCI-P3 color gamut delivers smooth, vivid visuals. The AeroBlade 3D Fan keeps thermals cool under intense gaming loads.",
      shortDescription: "Intel Core i9, RTX 4060, 16\" 165Hz WQXGA",
      price: "129990.00",
      categorySlug: "laptops",
      brand: "Acer",
      sku: "PH-NEO16-I9",
      featured: false,
      images: [
        "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "Intel Core i9-14900HX",
        Memory: "16GB DDR5",
        Storage: "1TB NVMe SSD",
        Display: '16" WQXGA IPS 165Hz',
        Graphics: "NVIDIA RTX 4060 8GB",
        Weight: "2.65 kg",
      },
    },
    {
      name: "MSI Creator Z16 HX Studio",
      slug: "msi-creator-z16-hx-studio",
      description:
        "Designed for creative professionals, the MSI Creator Z16 HX Studio features a gorgeous 16-inch Mini LED display with 100% DCI-P3 coverage and HDR 1000. Powered by Intel Core i9 and NVIDIA RTX 4070 laptop GPU, it delivers workstation-grade performance for video editing, 3D modelling, and graphic design. The CNC-milled aluminum chassis exudes premium craftsmanship.",
      shortDescription: "Intel Core i9, RTX 4070, 16\" Mini LED HDR1000",
      price: "174990.00",
      categorySlug: "laptops",
      brand: "MSI",
      sku: "CR-Z16HX-I9",
      featured: false,
      images: [
        "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "Intel Core i9-13950HX",
        Memory: "32GB DDR5",
        Storage: "2TB NVMe SSD",
        Display: '16" Mini LED QHD+ HDR 1000',
        Graphics: "NVIDIA RTX 4070 8GB",
        Weight: "2.20 kg",
      },
    },
    {
      name: "Lenovo Yoga Slim 7i Pro",
      slug: "lenovo-yoga-slim-7i-pro",
      description:
        "The perfect blend of performance and portability. The Lenovo Yoga Slim 7i Pro features a brilliant 14.5-inch 3K OLED display with Dolby Vision, powered by Intel Core i7. Ultra-thin and lightweight at just 1.45 kg, it's the ideal companion for professionals on the move. Impressive 15-hour battery life and rapid charging keep you productive all day.",
      shortDescription: "Intel Core i7, 14.5\" 3K OLED, 16GB RAM",
      price: "89990.00",
      compareAtPrice: "99990.00",
      categorySlug: "laptops",
      brand: "Lenovo",
      sku: "YS7I-PRO-I7",
      featured: true,
      images: [
        "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "Intel Core i7-13700H",
        Memory: "16GB LPDDR5",
        Storage: "512GB NVMe SSD",
        Display: '14.5" 3K OLED Dolby Vision',
        Battery: "Up to 15 hours",
        Weight: "1.45 kg",
      },
    },
    {
      name: "HP Pavilion Plus 14",
      slug: "hp-pavilion-plus-14",
      description:
        "An exceptional everyday laptop that punches above its weight. The HP Pavilion Plus 14 features a stunning 14-inch 2.8K OLED display with 100% DCI-P3 colour accuracy, powered by Intel Core i7. With 16GB RAM and a speedy 512GB SSD, it handles work, study, and entertainment with ease. Premium metal design with a slim profile makes it stand out.",
      shortDescription: "Intel Core i7, 14\" 2.8K OLED, 16GB RAM",
      price: "74999.00",
      categorySlug: "laptops",
      brand: "HP",
      sku: "HPP-PLUS14-I7",
      featured: false,
      images: [
        "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "Intel Core i7-13700H",
        Memory: "16GB DDR4",
        Storage: "512GB NVMe SSD",
        Display: '14" 2.8K OLED',
        Battery: "Up to 10 hours",
        Weight: "1.40 kg",
      },
    },
    {
      name: "Acer Swift X 14 (2024)",
      slug: "acer-swift-x-14-2024",
      description:
        "Thin, light, and surprisingly powerful. The Acer Swift X 14 pairs an AMD Ryzen 7 8845HS with an NVIDIA GeForce RTX 4050 for a remarkable ultrabook with discrete graphics. The 14.5-inch 2.8K OLED display is vivid and colour-accurate, making it ideal for content creation on the go. At just 1.5 kg, it slips into any bag effortlessly.",
      shortDescription: "AMD Ryzen 7, RTX 4050, 14.5\" 2.8K OLED",
      price: "84990.00",
      compareAtPrice: "94990.00",
      categorySlug: "laptops",
      brand: "Acer",
      sku: "SWX14-R7-4050",
      featured: false,
      images: [
        "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "AMD Ryzen 7 8845HS",
        Memory: "16GB LPDDR5x",
        Storage: "1TB NVMe SSD",
        Display: '14.5" 2.8K OLED',
        Graphics: "NVIDIA RTX 4050 6GB",
        Weight: "1.50 kg",
      },
    },
    {
      name: "Dell Inspiron 16 Plus",
      slug: "dell-inspiron-16-plus",
      description:
        "The Dell Inspiron 16 Plus delivers serious performance in a sleek, affordable package. Its 16-inch 2.5K IPS display with ComfortView Plus keeps your eyes relaxed during long work sessions. Powered by Intel Core i7-13700H and paired with 16GB DDR5 RAM and a 512GB SSD, it handles everything from coding and data analysis to casual gaming with the integrated Intel Arc graphics.",
      shortDescription: "Intel Core i7, 16\" 2.5K IPS, 16GB DDR5",
      price: "69990.00",
      compareAtPrice: "79990.00",
      categorySlug: "laptops",
      brand: "Dell",
      sku: "INS16P-I7-16",
      featured: false,
      images: [
        "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "Intel Core i7-13700H",
        Memory: "16GB DDR5",
        Storage: "512GB NVMe SSD",
        Display: '16" 2.5K IPS ComfortView Plus',
        Graphics: "Intel Arc A350M",
        Weight: "2.06 kg",
      },
    },
    {
      name: "ASUS VivoBook S 15 OLED",
      slug: "asus-vivobook-s15-oled",
      description:
        "Everyday excellence, redefined. The ASUS VivoBook S 15 OLED brings a stunning 15.6-inch 2.8K OLED display to an accessible price point. With the AMD Ryzen 7 7840HS processor and 16GB RAM, it breezes through multitasking. The slim, lightweight aluminium chassis and backlit keyboard make it a joy to carry and use. A fantastic all-rounder for students and professionals alike.",
      shortDescription: "AMD Ryzen 7, 15.6\" 2.8K OLED, 16GB RAM",
      price: "64990.00",
      categorySlug: "laptops",
      brand: "ASUS",
      sku: "VBS15-R7-OLED",
      featured: false,
      images: [
        "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/129205/pexels-photo-129205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "AMD Ryzen 7 7840HS",
        Memory: "16GB LPDDR5",
        Storage: "512GB NVMe SSD",
        Display: '15.6" 2.8K OLED',
        Battery: "Up to 10 hours",
        Weight: "1.60 kg",
      },
    },
    {
      name: "MSI Stealth 16 Studio",
      slug: "msi-stealth-16-studio",
      description:
        "Stealth-level performance in an ultra-slim chassis. The MSI Stealth 16 Studio combines a 16-inch UHD+ Mini LED display with Intel Core i9 and NVIDIA RTX 4080 to deliver an uncompromising creative and gaming powerhouse. Per-key RGB keyboard and Thunderbolt 4 connectivity round out the premium experience.",
      shortDescription: "Intel Core i9, RTX 4080, 16\" UHD+ Mini LED",
      price: "249990.00",
      compareAtPrice: "274990.00",
      categorySlug: "laptops",
      brand: "MSI",
      sku: "STL16-I9-4080",
      featured: true,
      images: [
        "https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "Intel Core i9-14900HX",
        Memory: "64GB DDR5",
        Storage: "2TB NVMe SSD",
        Display: '16" UHD+ Mini LED 120Hz',
        Graphics: "NVIDIA RTX 4080 12GB",
        Weight: "1.99 kg",
      },
    },
    {
      name: "HP OMEN 16 (2024)",
      slug: "hp-omen-16-2024",
      description:
        "Game without limits. The HP OMEN 16 pairs AMD Ryzen 9 with NVIDIA RTX 4070 for blistering gaming performance. The 16.1-inch QHD IPS display with 240Hz refresh rate and 3ms response time keeps you ahead of the competition. OMEN Tempest Cooling with dual fans and triple heat pipes ensures sustained performance even during marathon sessions.",
      shortDescription: "AMD Ryzen 9, RTX 4070, 16.1\" QHD 240Hz",
      price: "149999.00",
      compareAtPrice: "169999.00",
      categorySlug: "laptops",
      brand: "HP",
      sku: "OMEN16-R9-4070",
      featured: false,
      images: [
        "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/955401/pexels-photo-955401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "AMD Ryzen 9 8945HS",
        Memory: "32GB DDR5",
        Storage: "1TB NVMe SSD",
        Display: '16.1" QHD IPS 240Hz',
        Graphics: "NVIDIA RTX 4070 8GB",
        Weight: "2.37 kg",
      },
    },
    // ──── iPhones ────
    {
      name: "iPhone 15 Pro Max",
      slug: "iphone-15-pro-max",
      description:
        "iPhone 15 Pro Max features a strong and light titanium design with a textured matte finish. The A17 Pro chip enables new pro capabilities, from Action button to the most powerful iPhone camera system ever. Capture stunning 48MP photos and record 4K video at 120fps.",
      shortDescription: "A17 Pro chip, 48MP camera, Titanium design",
      price: "159900.00",
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
        "Water Resistance": "IP68",
      },
    },
    {
      name: "iPhone 15 Pro",
      slug: "iphone-15-pro",
      description:
        "iPhone 15 Pro. Forged in titanium with the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. Take 48MP photos and ProRes video. Experience the power of USB 3 for lightning-fast transfers.",
      shortDescription: "A17 Pro chip, 48MP camera, USB-C",
      price: "134900.00",
      categorySlug: "iphones",
      brand: "Apple",
      sku: "IP15P-128-NT",
      featured: false,
      images: [
        "https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/16005007/pexels-photo-16005007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/10883732/pexels-photo-10883732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "A17 Pro",
        Display: '6.1" Super Retina XDR',
        Camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
        Storage: "128GB",
        Battery: "Up to 23 hours video playback",
        "Water Resistance": "IP68",
      },
    },
    {
      name: "iPhone 15",
      slug: "iphone-15",
      description:
        "iPhone 15 brings Dynamic Island, a 48MP Main camera, and USB‑C to an iconic design. The A16 Bionic chip delivers fast performance, and the durable color-infused glass back looks stunning. All-day battery life keeps you going.",
      shortDescription: "A16 Bionic, 48MP camera, Dynamic Island",
      price: "69900.00",
      compareAtPrice: "79900.00",
      categorySlug: "iphones",
      brand: "Apple",
      sku: "IP15-128-BL",
      featured: false,
      images: [
        "https://images.pexels.com/photos/10883732/pexels-photo-10883732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/6370366/pexels-photo-6370366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "A16 Bionic",
        Display: '6.1" Super Retina XDR',
        Camera: "48MP Main + 12MP Ultra Wide",
        Storage: "128GB",
        Battery: "Up to 20 hours video playback",
        "Water Resistance": "IP68",
      },
    },
    // ──── Phones ────
    {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-galaxy-s24-ultra",
      description:
        "Welcome to the AI era of smartphones. The Galaxy S24 Ultra features Galaxy AI built-in, a titanium frame, and the most advanced camera system with 200MP sensor. The 6.8-inch Dynamic AMOLED 2X display with anti-reflective coating delivers stunning visuals. Built with embedded S Pen for productivity.",
      shortDescription: "Snapdragon 8 Gen 3, 200MP camera, S Pen",
      price: "129999.00",
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
        "S Pen": "Built-in",
      },
    },
    {
      name: "Google Pixel 8 Pro",
      slug: "google-pixel-8-pro",
      description:
        "Google Pixel 8 Pro is the most powerful Pixel yet, with Google Tensor G3 chip and the best Pixel Camera. Take stunning photos with advanced AI features like Best Take, Magic Eraser, and Photo Unblur. Seven years of OS and security updates guarantee long-term value.",
      shortDescription: "Tensor G3, 50MP camera, 7 years of updates",
      price: "84999.00",
      compareAtPrice: "99999.00",
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
        "Software Support": "7 years",
      },
    },
    // ──── iPads ────
    {
      name: 'iPad Pro 12.9" M2',
      slug: "ipad-pro-12-9-m2",
      description:
        "The ultimate iPad experience. iPad Pro 12.9-inch features the Apple M2 chip, delivering next-level performance with an incredibly efficient architecture. The stunning Liquid Retina XDR display with ProMotion offers an immersive visual experience with HDR content. Compatible with Apple Pencil 2nd generation for precise creative work.",
      shortDescription: "M2 chip, 12.9\" Liquid Retina XDR, ProMotion",
      price: "112900.00",
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
        Connectivity: "Wi-Fi 6E",
        "Apple Pencil": "2nd generation compatible",
      },
    },
    {
      name: "iPad Air M2",
      slug: "ipad-air-m2",
      description:
        "Power meets versatility. The iPad Air with M2 chip offers incredible performance in a thin and light design. The 10.9-inch Liquid Retina display with True Tone and P3 wide color brings your content to life. Perfect for creative projects, productivity, and entertainment.",
      shortDescription: "M2 chip, 10.9\" Liquid Retina, 128GB",
      price: "69900.00",
      categorySlug: "ipads",
      brand: "Apple",
      sku: "IPA-M2-128",
      featured: false,
      images: [
        "https://images.pexels.com/photos/8533366/pexels-photo-8533366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/8024027/pexels-photo-8024027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/6913315/pexels-photo-6913315.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "Apple M2",
        Display: '10.9" Liquid Retina',
        Storage: "128GB",
        Camera: "12MP Wide",
        Connectivity: "Wi-Fi 6",
        "Apple Pencil": "2nd generation compatible",
      },
    },
    {
      name: "iPad Mini 6th Gen",
      slug: "ipad-mini-6th-gen",
      description:
        "Big things in a small package. The iPad mini 6th generation packs the A15 Bionic chip into its compact 8.3-inch form factor. The all-screen design with Liquid Retina display, USB-C connectivity, and 5G capability make it the ultimate portable powerhouse. Perfect for reading, note-taking, and on-the-go productivity.",
      shortDescription: "A15 Bionic, 8.3\" Liquid Retina, USB-C",
      price: "46900.00",
      compareAtPrice: "52900.00",
      categorySlug: "ipads",
      brand: "Apple",
      sku: "IPM6-64-SG",
      featured: false,
      images: [
        "https://images.pexels.com/photos/6913315/pexels-photo-6913315.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/8533362/pexels-photo-8533362.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "https://images.pexels.com/photos/8533366/pexels-photo-8533366.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      ],
      specs: {
        Processor: "A15 Bionic",
        Display: '8.3" Liquid Retina',
        Storage: "64GB",
        Camera: "12MP Wide",
        Connectivity: "Wi-Fi 6 + 5G optional",
        "Apple Pencil": "2nd generation compatible",
      },
    },
    // ──── Tablets ────
    {
      name: "Samsung Galaxy Tab S9 Ultra",
      slug: "samsung-galaxy-tab-s9-ultra",
      description:
        "The Galaxy Tab S9 Ultra sets a new standard for Android tablets. Its massive 14.6-inch Dynamic AMOLED 2X display delivers vibrant visuals with 120Hz refresh rate. Powered by Snapdragon 8 Gen 2 for Galaxy, it handles any task with ease. IP68 water resistance adds peace of mind for any environment.",
      shortDescription: "Snapdragon 8 Gen 2, 14.6\" AMOLED, S Pen",
      price: "108999.00",
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
        "S Pen": "Included",
      },
    },
    {
      name: "Microsoft Surface Pro 10",
      slug: "microsoft-surface-pro-10",
      description:
        "The most powerful Surface Pro ever. With Intel Core Ultra processors and an optional OLED PixelSense Flow display, Surface Pro 10 combines the versatility of a tablet with the power of a laptop. Windows 11 with Copilot+ PC features and all-day battery life make it your ultimate productivity companion.",
      shortDescription: "Intel Core Ultra, 13\" PixelSense, Windows 11",
      price: "134999.00",
      compareAtPrice: "149999.00",
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
        Camera: "10MP rear + Windows Hello IR",
        Battery: "Up to 14 hours",
        Weight: "0.88 kg (tablet only)",
      },
    },
  ],
  reviews: [
    { productSlug: "macbook-pro-16-m3-max", author: "Arjun T.", rating: 5, title: "Absolute beast of a machine", content: "I use this for video editing and 3D rendering. The M3 Max chip handles everything I throw at it without breaking a sweat. The display is gorgeous and the battery lasts all day. Worth every rupee.", verified: true },
    { productSlug: "macbook-pro-16-m3-max", author: "Priya M.", rating: 5, title: "Professional grade performance", content: "Upgraded from the M1 Pro and the difference is remarkable. Compilation times are cut in half. The keyboard feels great and the speakers are incredible for a laptop.", verified: true },
    { productSlug: "macbook-pro-16-m3-max", author: "Deepak K.", rating: 4, title: "Nearly perfect", content: "Phenomenal machine but I wish it had more ports. The performance is unmatched and the battery life exceeds expectations. The only reason for 4 stars is the price point.", verified: false },
    { productSlug: "macbook-air-15-m3", author: "Sneha L.", rating: 5, title: "Best laptop I've ever owned", content: "The perfect balance of power and portability. It's incredibly thin yet handles my workflow (design + light video editing) without any issues. The display is beautiful.", verified: true },
    { productSlug: "macbook-air-15-m3", author: "Rohit H.", rating: 4, title: "Great everyday machine", content: "Fast, quiet, and beautiful. The larger screen is a game changer compared to the 13-inch. Battery easily lasts the full workday.", verified: true },
    { productSlug: "dell-xps-15-2024", author: "Karthik C.", rating: 5, title: "Stunning OLED display", content: "The 3.5K OLED display is breathtaking. Colors are incredibly accurate for photo editing. Build quality is top-notch and the keyboard is comfortable for long typing sessions.", verified: true },
    { productSlug: "dell-xps-15-2024", author: "Meera W.", rating: 4, title: "Excellent Windows laptop", content: "Great performance for development work. The display is the best I've seen on a Windows laptop. Only downside is the webcam placement could be better.", verified: true },
    { productSlug: "asus-rog-zephyrus-g16", author: "Jayesh P.", rating: 5, title: "Gaming perfection", content: "Runs every game at max settings smoothly. The 240Hz display is buttery smooth and the cooling system keeps temperatures in check. Surprisingly quiet in daily use.", verified: true },
    { productSlug: "asus-rog-zephyrus-g16", author: "Chirag N.", rating: 4, title: "Great gaming laptop", content: "Excellent performance and surprisingly portable for a gaming laptop. Battery life could be better during gaming sessions, but plugged in it's a beast.", verified: false },
    { productSlug: "hp-spectre-x360-16-2024", author: "Ananya S.", rating: 5, title: "The most beautiful laptop I've used", content: "The OLED display is stunning and the 360-degree hinge is super useful. Build quality is outstanding — feels like a luxury product. The pen support is a nice bonus for quick sketches.", verified: true },
    { productSlug: "hp-spectre-x360-16-2024", author: "Vikram R.", rating: 4, title: "Premium 2-in-1 experience", content: "Fantastic for presentations and creative work. Touch screen is responsive and the display colours are gorgeous. Only wish the battery lasted a bit longer.", verified: true },
    { productSlug: "acer-predator-helios-neo-16", author: "Siddharth M.", rating: 5, title: "Best gaming laptop under 1.5L", content: "Incredible value for money. RTX 4060 runs AAA games beautifully. The 165Hz display is smooth and colours are punchy. Cooling is surprisingly good — no thermal throttling.", verified: true },
    { productSlug: "acer-predator-helios-neo-16", author: "Rahul V.", rating: 4, title: "Solid gaming rig", content: "Great for the price. Gaming performance is excellent. Build quality is decent. Speaker quality could be better, but at this price point, can't complain.", verified: false },
    { productSlug: "msi-creator-z16-hx-studio", author: "Nandini G.", rating: 5, title: "Perfect for video editors", content: "The Mini LED display is absolutely stunning — HDR content looks lifelike. DaVinci Resolve runs buttery smooth. This is a serious workstation in a laptop form factor.", verified: true },
    { productSlug: "lenovo-yoga-slim-7i-pro", author: "Aditya K.", rating: 5, title: "Best OLED ultrabook at this price", content: "The 3K OLED display is stunning for watching movies and editing photos. Super lightweight, great battery life. Perfect for my daily work-from-home setup.", verified: true },
    { productSlug: "lenovo-yoga-slim-7i-pro", author: "Kavita S.", rating: 4, title: "Excellent daily driver", content: "Beautiful display, fast performance, and very portable. Keyboard is comfortable for all-day typing. Would have liked a USB-A port though.", verified: true },
    { productSlug: "hp-pavilion-plus-14", author: "Ravi D.", rating: 5, title: "Unbeatable OLED at this price", content: "Can't believe the display quality at under ₹75,000. The 2.8K OLED is sharp and vibrant. Performance is snappy for coding and browsing. Great student laptop.", verified: true },
    { productSlug: "acer-swift-x-14-2024", author: "Pooja T.", rating: 5, title: "Ultrabook with GPU power", content: "Getting an RTX 4050 in such a thin and light package is amazing. Perfect for Lightroom and Premiere Pro on the go. Build quality is solid for the price.", verified: true },
    { productSlug: "dell-inspiron-16-plus", author: "Manish B.", rating: 4, title: "Great value for students", content: "Excellent screen, good performance, and comfortable keyboard. The 16-inch display is great for productivity. Runs VS Code and Docker smoothly.", verified: true },
    { productSlug: "asus-vivobook-s15-oled", author: "Shreya P.", rating: 5, title: "Stunning display for the price", content: "The 2.8K OLED display makes everything look incredible. Ryzen 7 handles all my uni work without breaking a sweat. Battery is decent too. Love it!", verified: true },
    { productSlug: "msi-stealth-16-studio", author: "Amit J.", rating: 5, title: "Gaming beast in disguise", content: "Looks professional, performs like a gaming monster. The Mini LED display is breathtaking. RTX 4080 runs Cyberpunk at ultra settings. Best premium laptop I've owned.", verified: true },
    { productSlug: "hp-omen-16-2024", author: "Kunal R.", rating: 4, title: "Solid gaming performance", content: "The 240Hz display is silky smooth. RTX 4070 handles everything at high settings. Cooling is effective. Only downside is the slightly plasticky build, but internals are top-tier.", verified: true },
    { productSlug: "iphone-15-pro-max", author: "Lisa R.", rating: 5, title: "The best iPhone yet", content: "The titanium design is gorgeous and noticeably lighter. Camera system is incredible — the 5x zoom is a game changer. Battery easily lasts a full day with heavy use.", verified: true },
    { productSlug: "iphone-15-pro-max", author: "Kabir B.", rating: 5, title: "Photography powerhouse", content: "As a photographer, the camera quality blows me away. 48MP photos are incredibly detailed. USB-C is finally here and data transfer speeds are fantastic.", verified: true },
    { productSlug: "iphone-15-pro-max", author: "Aarti Z.", rating: 4, title: "Amazing but expensive", content: "Easily the best phone I've used. The screen is stunning and performance is flawless. The only hesitation is the price, but you're paying for premium quality.", verified: true },
    { productSlug: "samsung-galaxy-s24-ultra", author: "Tarun J.", rating: 5, title: "Galaxy AI is incredible", content: "The AI features are genuinely useful — live translation during calls is magical. The 200MP camera captures incredible detail and the S Pen remains unmatched for note-taking.", verified: true },
    { productSlug: "samsung-galaxy-s24-ultra", author: "Nina F.", rating: 4, title: "Premium Android experience", content: "Best Android phone available. The titanium frame feels premium and the display is stunning. Battery life is excellent. AI features set it apart from competition.", verified: true },
    { productSlug: "google-pixel-8-pro", author: "Manoj S.", rating: 5, title: "Pure Google magic", content: "The camera is phenomenal, especially in low light. AI features like Magic Eraser and Best Take are genuinely useful. 7 years of updates is incredible value.", verified: true },
    { productSlug: "ipad-pro-12-9-m2", author: "Rachana D.", rating: 5, title: "A true laptop replacement", content: "With Stage Manager and the M2 chip, this iPad truly replaces my laptop for most tasks. The XDR display is perfect for photo editing. The Apple Pencil experience is unmatched.", verified: true },
    { productSlug: "ipad-pro-12-9-m2", author: "Suresh H.", rating: 4, title: "Amazing hardware, software catching up", content: "The hardware is incredible — fast, beautiful display, great speakers. iPadOS is getting better but still has some limitations compared to macOS for serious work.", verified: true },
    { productSlug: "microsoft-surface-pro-10", author: "Pallavi M.", rating: 5, title: "Perfect 2-in-1 device", content: "The best of both worlds — a great tablet and a capable laptop. The OLED display option is gorgeous. Copilot features make it feel futuristic. Battery lasts all day.", verified: true },
    { productSlug: "microsoft-surface-pro-10", author: "Dinesh G.", rating: 4, title: "Excellent productivity tool", content: "Perfect for my workflow — meetings, note-taking, and light development. The kickstand is versatile and the keyboard (sold separately) is comfortable.", verified: true },
    { productSlug: "ipad-air-m2", author: "Sonia K.", rating: 5, title: "Sweet spot for most users", content: "Don't need the Pro for my use case. The M2 chip is plenty fast, the display is beautiful, and it's noticeably lighter. Great value compared to the Pro.", verified: true },
    { productSlug: "ipad-mini-6th-gen", author: "Jai T.", rating: 5, title: "Perfect size for reading", content: "I love the compact form factor. It's my go-to device for reading, quick notes, and casual browsing. The A15 chip is still plenty fast for everything I do.", verified: true },
    { productSlug: "thinkpad-x1-carbon-gen12", author: "Phalguni W.", rating: 5, title: "Business laptop perfection", content: "The keyboard is the best on any laptop, period. Incredibly light, great display, and the build quality is outstanding. Perfect for business travel.", verified: true },
    { productSlug: "samsung-galaxy-tab-s9-ultra", author: "Garima L.", rating: 4, title: "Huge and powerful", content: "The screen is absolutely massive and beautiful. Great for media consumption and the S Pen is excellent. Android tablet apps are improving too.", verified: true },
    { productSlug: "iphone-15", author: "Tushar R.", rating: 5, title: "Great value iPhone", content: "Dynamic Island is really useful and the 48MP camera is a huge upgrade. USB-C is so convenient. Best iPhone for the price, hands down.", verified: true },
    { productSlug: "iphone-15", author: "Lavanya B.", rating: 4, title: "Solid upgrade", content: "Coming from iPhone 13, the improvements are noticeable. Better camera, USB-C, and Dynamic Island make it worth upgrading. Smooth and reliable as always.", verified: true },
    { productSlug: "macbook-pro-14-m3-pro", author: "Naveen W.", rating: 5, title: "Perfect pro machine", content: "The 14-inch size is my sweet spot. M3 Pro handles everything from code compilation to video editing with ease. Best display I've ever used on a laptop.", verified: true },
    { productSlug: "iphone-15-pro", author: "Ishaan V.", rating: 5, title: "Best Pro value", content: "Same A17 Pro chip as the Pro Max but at a lower price. 6.1-inch is the perfect phone size. Camera is outstanding and the titanium build is gorgeous.", verified: true },
  ],
};

export async function POST() {
  try {
    // Clear existing data
    await db.execute(sql`TRUNCATE TABLE reviews, orders, products, categories RESTART IDENTITY CASCADE`);

    // Insert categories
    const insertedCategories = await db
      .insert(categories)
      .values(SEED_DATA.categories)
      .returning();

    const categoryMap = new Map(insertedCategories.map((c) => [c.slug, c.id]));

    // Insert products
    const productValues = SEED_DATA.products.map((p) => ({
      name: p.name,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription,
      price: p.price,
      compareAtPrice: p.compareAtPrice || null,
      categoryId: categoryMap.get(p.categorySlug) || null,
      brand: p.brand,
      sku: p.sku,
      featured: p.featured,
      images: p.images,
      specs: p.specs as unknown as Record<string, string>,
    }));

    const insertedProducts = await db
      .insert(products)
      .values(productValues)
      .returning();

    const productMap = new Map(insertedProducts.map((p) => [p.slug, p.id]));

    // Insert reviews
    const reviewValues = SEED_DATA.reviews.map((r) => ({
      productId: productMap.get(r.productSlug)!,
      author: r.author,
      rating: r.rating,
      title: r.title,
      content: r.content,
      verified: r.verified,
    }));

    await db.insert(reviews).values(reviewValues);

    return NextResponse.json({
      success: true,
      counts: {
        categories: insertedCategories.length,
        products: insertedProducts.length,
        reviews: reviewValues.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
