// Product catalog data for the E-Commerce Clothing Store
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Oversized Minimalist Trench Coat",
    category: "women",
    price: 139.99,
    originalPrice: 189.99,
    badge: "Bestseller",
    rating: 4.8,
    reviewsCount: 142,
    description: "Tailored from premium water-resistant cotton twill. Features a relaxed double-breasted silhouette, belted waist, storm flap, and deep welt pockets for effortless autumn elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Classic Camel", hex: "#C19A6B" },
      { name: "Onyx Black", hex: "#1F2022" },
      { name: "Sage Mist", hex: "#9CAF88" }
    ],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["trending", "featured", "outerwear"]
  },
  {
    id: 2,
    name: "Vintage Washed Denim Trucker Jacket",
    category: "men",
    price: 89.50,
    originalPrice: 119.00,
    badge: "Sale",
    rating: 4.7,
    reviewsCount: 98,
    description: "Crafted from 100% heavy-weight ring-spun cotton denim with authentic vintage distressing, antique brass hardware, and dual button-flap chest pockets.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Vintage Indigo", hex: "#3B5998" },
      { name: "Washed Slate", hex: "#4A5568" },
      { name: "Sunbleached Blue", hex: "#8DA4C4" }
    ],
    images: [
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["denim", "featured", "outerwear"]
  },
  {
    id: 3,
    name: "Pure Cashmere Mock-Neck Knit Sweater",
    category: "women",
    price: 115.00,
    originalPrice: 160.00,
    badge: "Luxury",
    rating: 4.9,
    reviewsCount: 210,
    description: "Spun from ultra-soft Inner Mongolian grade-A cashmere. Features a structured mock neck, ribbed cuffs, and a cozy semi-relaxed drape.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream Ivory", hex: "#FDFBF7" },
      { name: "Heather Oatmeal", hex: "#D7C4B7" },
      { name: "Dusty Rose", hex: "#D4A5A5" }
    ],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["winter", "knitwear", "featured"]
  },
  {
    id: 4,
    name: "Tailored Smart Slim-Fit Chinos",
    category: "men",
    price: 59.00,
    originalPrice: 79.00,
    badge: "",
    rating: 4.6,
    reviewsCount: 76,
    description: "Stretch-infused organic twill chinos with a modern tapered cut. Perfect for business casual days or refined weekend outings with built-in hidden flex waistband.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "British Khaki", hex: "#C3B091" },
      { name: "Midnight Navy", hex: "#1A2530" },
      { name: "Charcoal Grey", hex: "#36454F" }
    ],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["bottoms", "pants", "smart-casual"]
  },
  {
    id: 5,
    name: "Heavyweight Boxy Graphic Hoodie",
    category: "streetwear",
    price: 74.50,
    originalPrice: 95.00,
    badge: "Trending",
    rating: 4.9,
    reviewsCount: 184,
    description: "450 GSM French terry fleece engineered for an architectural drop-shoulder fit. Features double-lined thermal hood, minimal tonal embroidery, and kangaroo pouch.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Off-White Cloud", hex: "#ECEBE4" },
      { name: "Matte Black", hex: "#121212" },
      { name: "Forest Moss", hex: "#2E473B" }
    ],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["streetwear", "hoodie", "featured"]
  },
  {
    id: 6,
    name: "Mulberry Silk Bias-Cut Midi Dress",
    category: "women",
    price: 128.00,
    originalPrice: 175.00,
    badge: "Hot",
    rating: 4.8,
    reviewsCount: 119,
    description: "Cut on the bias for a liquid silhouette that moves effortlessly. Features delicate cowl neckline, adjustable crossover straps, and side slit detail.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Emerald Green", hex: "#046307" },
      { name: "Champagne Gold", hex: "#E7D39F" },
      { name: "Midnight Noir", hex: "#111116" }
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["dresses", "evening", "summer"]
  },
  {
    id: 7,
    name: "Artisan Low-Top Leather Sneakers",
    category: "shoes",
    price: 129.00,
    originalPrice: 165.00,
    badge: "Exclusive",
    rating: 4.9,
    reviewsCount: 165,
    description: "Handcrafted in Portugal using full-grain Italian calfskin. Features reinforced stitched cupsole, memory foam antimicrobial footbed, and waxed cotton laces.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Optic White", hex: "#FFFFFF" },
      { name: "Monochrome Black", hex: "#1E1E1E" },
      { name: "Cognac Brown", hex: "#834333" }
    ],
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["shoes", "footwear", "leather"]
  },
  {
    id: 8,
    name: "Classic Oxford Pinpoint Button-Down Shirt",
    category: "men",
    price: 52.00,
    originalPrice: 68.00,
    badge: "",
    rating: 4.6,
    reviewsCount: 88,
    description: "Woven from 100% two-ply combed cotton. Features an authentic collar roll, mother-of-pearl buttons, and rounded barrel cuffs for timeless collegiate style.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Sky Blue", hex: "#B9D9EB" },
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Candy Stripe", hex: "#E3A857" }
    ],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["shirts", "formal", "men"]
  },
  {
    id: 9,
    name: "Structured Wool Wide-Brim Fedora",
    category: "accessories",
    price: 45.00,
    originalPrice: 65.00,
    badge: "Trending",
    rating: 4.7,
    reviewsCount: 53,
    description: "100% Australian wool felt hat with hand-finished teardrop crown, genuine leather tonal band, and inner moisture-wicking adjustable drawstring sweatband.",
    sizes: ["S/M", "L/XL"],
    colors: [
      { name: "Espresso Brown", hex: "#4A3525" },
      { name: "Sand Dune", hex: "#C2B280" },
      { name: "Pitch Black", hex: "#000000" }
    ],
    images: [
      "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["accessories", "hats", "wool"]
  },
  {
    id: 10,
    name: "Retro Ribbed Corduroy Overshirt",
    category: "streetwear",
    price: 68.00,
    originalPrice: 88.00,
    badge: "New",
    rating: 4.8,
    reviewsCount: 67,
    description: "Woven in an 8-wale plush organic cotton corduroy. Cut relaxed through the torso for easy layering over tees or knits, with matte horn buttons.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Rust Terracotta", hex: "#B85D36" },
      { name: "Olive Field", hex: "#556B2F" },
      { name: "Deep Navy", hex: "#1C2D42" }
    ],
    images: [
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["streetwear", "outerwear", "casual"]
  },
  {
    id: 11,
    name: "High-Rise Pleated Wide-Leg Trousers",
    category: "women",
    price: 78.00,
    originalPrice: 98.00,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 177,
    description: "Architectural drape tailored with front double pleats, high contoured waistband, concealed hook and zip fastening, and fluid crease-resistant crepe fabric.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Taupe Brown", hex: "#8B8589" },
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Alabaster White", hex: "#F2F0EB" }
    ],
    images: [
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["pants", "women", "chic"]
  },
  {
    id: 12,
    name: "Handcrafted Waxed Canvas Messenger Bag",
    category: "accessories",
    price: 79.00,
    originalPrice: 110.00,
    badge: "Sale",
    rating: 4.8,
    reviewsCount: 104,
    description: "Built to last from 18oz waterproof waxed canvas with vegetable-tanned bridle leather trims, solid brass hardware, and padded 15-inch laptop compartment.",
    sizes: ["One Size"],
    colors: [
      { name: "Heritage Tan", hex: "#D2B48C" },
      { name: "Army Green", hex: "#4B5320" },
      { name: "Midnight Charcoal", hex: "#2C3539" }
    ],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    tags: ["bags", "accessories", "leather"]
  }
];

// Available coupon codes
const PROMO_CODES = {
  "WELCOME10": { discountPercent: 10, description: "10% off your entire first order" },
  "SPRING40": { discountPercent: 40, description: "Flash Spring Sale: 40% off" },
  "SAVE15": { discountPercent: 15, description: "Special 15% off cart discount" }
};
