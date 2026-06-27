export const fallbackProducts = [
  { id: "amber-muse-edp", name: "Amber Muse Eau de Parfum", type: "perfume", fit: "Vanilla - Saffron - Woods", price: 1899, color: "#c47a3c", bg: "#fff0dc", shape: "bottle", tag: "Signature" },
  { id: "noir-bloom-edp", name: "Noir Bloom Eau de Parfum", type: "perfume", fit: "Rose - Oud - Smoked Sugar", price: 2199, color: "#4f2535", bg: "#f7e6ed", shape: "tall-bottle", tag: "Restock" },
  { id: "citrus-veil-edt", name: "Citrus Veil Eau de Toilette", type: "perfume", fit: "Mandarin - Neroli - Musk", price: 1499, color: "#e8b23f", bg: "#fff7d7", shape: "round-bottle", tag: "Daily Fresh" },
  { id: "velvet-rain-edp", name: "Velvet Rain Eau de Parfum", type: "perfume", fit: "Iris - Tea - Clean Amber", price: 1799, color: "#7b73c8", bg: "#ecebff", shape: "bottle", tag: "Soft Trail" },
  { id: "discovery-wardrobe", name: "Discovery Scent Wardrobe", type: "discovery", fit: "5 x 8ml Minis", price: 999, color: "#00a6a6", bg: "#ddfbf7", shape: "set", tag: "Try First" },
  { id: "date-night-duo", name: "Date Night Perfume Duo", type: "discovery", fit: "2 x 15ml Travel Sprays", price: 1299, color: "#e63946", bg: "#ffe6e9", shape: "set", tag: "Giftable" },
  { id: "linen-cloud-mist", name: "Linen Cloud Body Mist", type: "perfume", fit: "Cotton - Pear - White Musk", price: 799, color: "#8fc7d9", bg: "#e7f8ff", shape: "tall-bottle", tag: "Under Rs 1000" },
  { id: "first-fit-preview", name: "First Clothing Drop Preview", type: "clothing", fit: "Coming Soon", price: 0, color: "#151515", bg: "#f1eee8", shape: "folded", tag: "Future Drop" }
];

export function formatPrice(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
}
