export const FRAME_COLORS = [
  // Wedding & Love Heart Frames
  { id: "wedding-pearl", name: "💍 Pearl & Gold (Love)", hex: "#FFFDF9", textHex: "#6B1D2F", borderHex: "#D4AF37", hasWeddingRings: true, hasHeartShape: true, strokeColor: "#D4AF37" },
  { id: "wedding-rose", name: "💐 Rose Gold (Love)", hex: "#FFF0F5", textHex: "#800F2F", borderHex: "#E0A96D", hasWeddingRings: true, hasHeartShape: true, strokeColor: "#E0A96D" },
  { id: "wedding-noir", name: "🎩 Black Tie Gold (Love)", hex: "#191417", textHex: "#F3E5AB", borderHex: "#D4AF37", hasWeddingRings: true, hasHeartShape: true, strokeColor: "#F3E5AB" },

  // Conceptual Frames
  { id: "newspaper-paper", name: "📰 Broadsheet News", hex: "#F5F2EB", textHex: "#18181B", borderHex: "#404040", hasNewspaperHeader: true },
  { id: "evidence-folder", name: "🕵️ Case Manila", hex: "#F4E8C1", textHex: "#4A1515", borderHex: "#B89758", hasEvidencePin: true },
  { id: "receipt-paper", name: "🧾 Thermal Struk", hex: "#FDFDFD", textHex: "#111111", borderHex: "#D1D5DB", hasReceiptEdge: true },
  { id: "cyber-card", name: "🎮 Cyber Neon", hex: "#0B0F19", textHex: "#38BDF8", borderHex: "#3B82F6", hasHoloBorder: true },
  { id: "multiverse-dark", name: "🪐 Cosmic Void", hex: "#090A0F", textHex: "#A78BFA", borderHex: "#6366F1", hasMultiverseStars: true },
  { id: "collector-box", name: "📦 Toy Box", hex: "#181824", textHex: "#FDE047", borderHex: "#EC4899", hasCollectorBadge: true },
  { id: "terminal-os", name: "💻 Windows OS", hex: "#000080", textHex: "#FFFFFF", borderHex: "#67E8F9", hasOSWindow: true },
  { id: "parchment-map", name: "🗺️ Explorer Map", hex: "#FAF0CA", textHex: "#3D2612", borderHex: "#EE964B", hasCompass: true },

  // Themed & Aesthetic Frames
  { id: "kawaii-pink", name: "🎀 Kawaii Pink", hex: "#FFF0F5", textHex: "#C2185B", borderHex: "#F8BBD0", hasBow: true },
  { id: "strawberry-red", name: "🍓 Berry Milk", hex: "#FFF0F3", textHex: "#A4133C", borderHex: "#FF8FA3", hasStrawberry: true },
  { id: "teddy-brown", name: "🧸 Teddy Honey", hex: "#FDF6EE", textHex: "#582F0E", borderHex: "#DDA15E", hasTeddyEars: true, earColor: "#FDF6EE", innerEarColor: "#E6CCB2" },
  { id: "love-letter-ivory", name: "💌 Love Ivory", hex: "#FCFBF7", textHex: "#800F2F", borderHex: "#E8D8C8", hasWaxSeal: true },
  { id: "disposable-green", name: "📸 Disposable 90s", hex: "#18231F", textHex: "#E2E8F0", borderHex: "#2D6A4F", hasCameraStamp: true },
  { id: "garden-sage", name: "🌼 Garden Sage", hex: "#F4F9F4", textHex: "#2D5A27", borderHex: "#B7E4C7", hasFlowers: true },
  { id: "scrapbook-kraft", name: "📝 Kraft Journal", hex: "#F5EBE0", textHex: "#3D312A", borderHex: "#D5BDAF", hasWashiTape: true },
  { id: "cat-pink", name: "🐾 Neko Pink", hex: "#FFE5EC", textHex: "#800F2F", borderHex: "#FFB3C1", hasCatEars: true, earColor: "#FFE5EC", innerEarColor: "#FFB3C1" },
  { id: "cat-cream", name: "🐱 Calico Cream", hex: "#FFF8EE", textHex: "#5C3A21", borderHex: "#FAD899", hasCatEars: true, earColor: "#FFF8EE", innerEarColor: "#FFC896" },
  { id: "cat-black", name: "🐈‍⬛ Kuro Neko", hex: "#202028", textHex: "#FFE5EC", borderHex: "#3F3F50", hasCatEars: true, earColor: "#202028", innerEarColor: "#FF85A1" },
  { id: "cat-matcha", name: "🍵 Matcha Neko", hex: "#EDF7EE", textHex: "#25522B", borderHex: "#C7E8CB", hasCatEars: true, earColor: "#EDF7EE", innerEarColor: "#A8D5AE" },
  { id: "white", name: "Clean White", hex: "#FFFFFF", textHex: "#1E1E24", borderHex: "#E5E7EB" },
  { id: "cream", name: "Warm Cream", hex: "#FAF6EE", textHex: "#2C2A29", borderHex: "#E4DCCF" },
  { id: "black", name: "Matte Black", hex: "#18181B", textHex: "#F4F4F5", borderHex: "#27272A" },
  { id: "pink", name: "Soft Pink", hex: "#FFE5EC", textHex: "#9B2226", borderHex: "#FFB3C1" },
  { id: "blue", name: "Baby Blue", hex: "#E0F2FE", textHex: "#0369A1", borderHex: "#BAE6FD" },
  { id: "lavender", name: "Lavender", hex: "#F3E8FF", textHex: "#6B21A8", borderHex: "#E9D5FF" },
  { id: "mint", name: "Fresh Mint", hex: "#E6F4EA", textHex: "#137333", borderHex: "#CEEAD6" },
  { id: "butter", name: "Buttercup", hex: "#FEF9C3", textHex: "#854D0E", borderHex: "#FEF08A" },
  { id: "film-black", name: "Noir 35mm", hex: "#111113", textHex: "#E2E8F0", borderHex: "#2D3748" },
];

export const FRAME_STYLES = [
  { id: "standard", name: "Standard (Medium)", padding: "p-4 sm:p-5", gap: "gap-3" },
  { id: "chunky", name: "Chunky Neobrutalist", padding: "p-6 sm:p-7", gap: "gap-4" },
  { id: "slim", name: "Slim & Modern", padding: "p-2.5 sm:p-3", gap: "gap-2" },
];

export const CORNER_STYLES = [
  { id: "rounded", name: "Smooth", class: "rounded-xl" },
  { id: "extra-rounded", name: "Curved", class: "rounded-2xl" },
  { id: "sharp", name: "Editorial Sharp", class: "rounded-none" },
];
