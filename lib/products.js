export const fallbackProducts = [
  { id: "neo-pop-tee", name: "Neo Pop Oversized Tee", type: "tees", fit: "Oversized", price: 799, color: "#e63946", bg: "#ffe6e9", shape: "shirt", tag: "Drop Pick" },
  { id: "arcade-night-tee", name: "Arcade Night Graphic Tee", type: "tees", fit: "Relaxed", price: 699, color: "#151515", bg: "#eef0ff", shape: "shirt", tag: "Fresh" },
  { id: "metro-runner-joggers", name: "Metro Runner Joggers", type: "hoodies", fit: "Tapered", price: 1499, color: "#00a6a6", bg: "#ddfbf7", shape: "hoodie", tag: "Utility" },
  { id: "weekend-core-hoodie", name: "Weekend Core Hoodie", type: "hoodies", fit: "Regular", price: 1799, color: "#2454ff", bg: "#e7ecff", shape: "hoodie", tag: "Restock" },
  { id: "patchwork-cap", name: "Patchwork Cap", type: "accessories", fit: "Adjustable", price: 499, color: "#f4c542", bg: "#fff4c9", shape: "accessory", tag: "Under Rs 500" },
  { id: "street-kit-backpack", name: "Street Kit Backpack", type: "accessories", fit: "18L", price: 1299, color: "#111111", bg: "#f2f2f2", shape: "accessory", tag: "Carry" },
  { id: "sunset-panel-tee", name: "Sunset Panel Tee", type: "tees", fit: "Regular", price: 599, color: "#ff7a1a", bg: "#fff0e2", shape: "shirt", tag: "Everyday" },
  { id: "after-hours-hoodie", name: "After Hours Hoodie", type: "hoodies", fit: "Oversized", price: 1899, color: "#743ad5", bg: "#f0e9ff", shape: "hoodie", tag: "Late Drop" }
];

export function formatPrice(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
}
