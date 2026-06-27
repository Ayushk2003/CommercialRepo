export const storefront = {
  brand: {
    name: "VibeVault",
    mark: "VV",
    ariaLabel: "VibeVault perfume store home"
  },
  navigation: [
    { label: "New Scents", href: "#drops" },
    { label: "Collections", href: "#categories" },
    { label: "Bestsellers", href: "#bestsellers" },
    { label: "Why Us", href: "#perks" }
  ],
  searchPlaceholder: "Search perfume, notes, mood",
  hero: {
    eyebrow: "Fine fragrance, crafted for everyday rituals",
    title: "Find the scent that enters before you do.",
    subtitle: "A perfume-first online storefront with 3D product previews, curated notes, and a future-ready space for clothing drops.",
    primaryAction: { label: "Shop Perfumes", href: "#bestsellers" },
    secondaryAction: { label: "Explore Collections", href: "#categories" },
    alt: "3D perfume bottles floating in a premium storefront"
  },
  promo: {
    label: "Store benefits",
    items: ["Free shipping over Rs 999", "Easy 15-day returns", "Secure Razorpay checkout"],
    inventoryLabels: {
      supabase: "Live fragrance inventory",
      fallback: "Demo fragrance inventory"
    }
  },
  categories: {
    eyebrow: "Shop by scent story",
    title: "Perfume collections now, clothing later",
    link: { label: "View all products", href: "#bestsellers" },
    featured: [
      { label: "Signature Perfumes", text: "Warm, floral, oud, citrus, and clean everyday scents", className: "tall amber" },
      { label: "Discovery Sets", text: "Try minis before choosing your full bottle", className: "rose" }
    ],
    mini: [
      { label: "Date Night", text: "Velvet amber trails", tone: "red" },
      { label: "Daily Fresh", text: "Citrus and clean musk", tone: "teal" },
      { label: "Clothing Soon", text: "Soft fits after fragrance", tone: "yellow" }
    ]
  },
  drops: {
    eyebrow: "Just landed",
    title: "Scent release board",
    items: [
      { time: "10:00", title: "Amber Muse Eau de Parfum", text: "Vanilla, saffron, and polished woods in a soft projection." },
      { time: "14:00", title: "Citrus Veil Discovery Set", text: "Five minis for building a morning-to-night scent wardrobe." },
      { time: "19:00", title: "Noir Bloom Restock", text: "Rose, oud, and smoked sugar returns in 50ml tonight." }
    ]
  },
  products: {
    eyebrow: "Trending now",
    title: "Perfume bestsellers",
    empty: "No matching scents found."
  },
  filters: [
    { label: "All", value: "all" },
    { label: "Perfume", value: "perfume" },
    { label: "Discovery", value: "discovery" },
    { label: "Clothing Soon", value: "clothing" }
  ],
  perks: {
    eyebrow: "Why shoppers come back",
    title: "Built for online fragrance shopping",
    items: [
      { icon: "sparkles", title: "3D product feel", text: "Perfume bottles are staged with depth, highlights, and mobile-friendly product cards." },
      { icon: "check", title: "Note-first choosing", text: "Every scent includes mood cues so shoppers can pick confidently." },
      { icon: "credit", title: "Storefront ready", text: "Cart, checkout, inventory fallback, and future categories are already wired in." }
    ]
  },
  chat: {
    assistantName: "Scent Buddy",
    assistantSubtitle: "Perfume shopping assistant",
    launchLabel: "Ask me",
    initialMessage: "Hi, I am Scent Buddy. Tell me your mood, occasion, budget, or favorite notes and I will help you pick a perfume.",
    quickPrompts: ["Gift under Rs 1500", "Fresh daily scent?", "Long lasting perfume"],
    inputPlaceholder: "Ask about notes, gifts, longevity...",
    defaultReply: "My pick right now is Amber Muse: cozy vanilla, saffron glow, and an easy compliment trail."
  },
  cart: {
    empty: "Your cart is waiting for a beautiful scent.",
    checkoutDescription: "Perfume checkout"
  }
};
