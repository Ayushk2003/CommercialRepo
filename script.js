const products = [
  { name: "Neo Pop Oversized Tee", type: "tees", fit: "Oversized", price: 799, color: "#e63946", bg: "#ffe6e9", shape: "shirt" },
  { name: "Arcade Night Graphic Tee", type: "tees", fit: "Relaxed", price: 699, color: "#151515", bg: "#eef0ff", shape: "shirt" },
  { name: "Metro Runner Joggers", type: "hoodies", fit: "Tapered", price: 1499, color: "#00a6a6", bg: "#ddfbf7", shape: "hoodie" },
  { name: "Weekend Core Hoodie", type: "hoodies", fit: "Regular", price: 1799, color: "#2454ff", bg: "#e7ecff", shape: "hoodie" },
  { name: "Patchwork Cap", type: "accessories", fit: "Adjustable", price: 499, color: "#f4c542", bg: "#fff4c9", shape: "accessory" },
  { name: "Street Kit Backpack", type: "accessories", fit: "18L", price: 1299, color: "#111111", bg: "#f2f2f2", shape: "accessory" },
  { name: "Sunset Panel Tee", type: "tees", fit: "Regular", price: 599, color: "#ff7a1a", bg: "#fff0e2", shape: "shirt" },
  { name: "After Hours Hoodie", type: "hoodies", fit: "Oversized", price: 1899, color: "#743ad5", bg: "#f0e9ff", shape: "hoodie" }
];

const productGrid = document.querySelector("#productGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterButtons = [...document.querySelectorAll(".filter")];
const cartPanel = document.querySelector("#cartPanel");
const cartButton = document.querySelector("#cartButton");
const closeCart = document.querySelector("#closeCart");
const scrim = document.querySelector("#scrim");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");
const chatLauncher = document.querySelector("#chatLauncher");
const chatWindow = document.querySelector("#chatWindow");
const closeChat = document.querySelector("#closeChat");
const chatMessages = document.querySelector("#chatMessages");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const quickPrompts = document.querySelector(".quick-prompts");

let activeFilter = "all";
let cart = [];

function formatPrice(value) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}

function productShape(product) {
  return `<div class="mock-${product.shape}" style="--item-color: ${product.color}"></div>`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.type === activeFilter;
    const matchesSearch = [product.name, product.type, product.fit].join(" ").toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  productGrid.innerHTML = visible.map((product, index) => `
    <article class="product-card" data-name="${product.name}">
      <div class="product-art" style="--art-bg: ${product.bg}">
        ${productShape(product)}
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="meta">
          <span>${product.fit}</span>
          <span class="price">${formatPrice(product.price)}</span>
        </div>
        <button class="button primary add-to-cart" type="button" data-index="${products.indexOf(product)}">Add to Cart</button>
      </div>
    </article>
  `).join("");

  emptyState.hidden = visible.length > 0;
}

function renderCart() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  cartTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-state">Your cart is waiting for a fresh fit.</p>`;
    return;
  }

  cartItems.innerHTML = cart.map((product, index) => `
    <div class="cart-row">
      <div>
        <strong>${product.name}</strong>
        <span>${product.fit} - ${formatPrice(product.price)}</span>
      </div>
      <button class="icon-button remove-item" type="button" aria-label="Remove ${product.name}" data-index="${index}">x</button>
    </div>
  `).join("");
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  scrim.classList.add("visible");
}

function hideCart() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  scrim.classList.remove("visible");
}

function openChat() {
  chatWindow.classList.add("open");
  chatWindow.setAttribute("aria-hidden", "false");
  chatLauncher.setAttribute("aria-expanded", "true");
  window.setTimeout(() => chatInput.focus(), 50);
}

function hideChat() {
  chatWindow.classList.remove("open");
  chatWindow.setAttribute("aria-hidden", "true");
  chatLauncher.setAttribute("aria-expanded", "false");
}

function addChatMessage(text, sender = "bot") {
  const message = document.createElement("div");
  message.className = `chat-message ${sender}`;
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function bestProductFor(query) {
  const normalized = query.toLowerCase();
  if (normalized.includes("gift") || normalized.includes("under") || normalized.includes("1000")) {
    return products.filter((product) => product.price <= 1000).sort((a, b) => b.price - a.price)[0];
  }
  if (normalized.includes("hoodie") || normalized.includes("winter") || normalized.includes("layer")) {
    return products.find((product) => product.type === "hoodies");
  }
  if (normalized.includes("cap") || normalized.includes("bag") || normalized.includes("accessor")) {
    return products.find((product) => product.type === "accessories");
  }
  if (normalized.includes("oversized")) {
    return products.find((product) => product.fit.toLowerCase() === "oversized");
  }
  return products[0];
}

function getBotReply(input) {
  const text = input.toLowerCase();
  const cartTotalValue = cart.reduce((sum, product) => sum + product.price, 0);

  if (text.includes("shipping") || text.includes("return") || text.includes("cod")) {
    return "Shipping is free over Rs 999, COD is available, and returns are easy for 15 days. For this prototype, checkout is a demo flow.";
  }

  if (text.includes("size") || text.includes("fit")) {
    return "For a relaxed streetwear look, pick your usual size. For a bigger drop-shoulder fit, go one size up. Oversized products are already cut roomier.";
  }

  if (text.includes("cart") || text.includes("subtotal") || text.includes("checkout")) {
    if (!cart.length) return "Your cart is empty right now. Try adding the Neo Pop Oversized Tee or Weekend Core Hoodie first.";
    return `You have ${cart.length} item${cart.length > 1 ? "s" : ""} in cart with a subtotal of ${formatPrice(cartTotalValue)}. Checkout is available as a prototype button.`;
  }

  if (text.includes("drop") || text.includes("new")) {
    return "Today's drop board has Neo Pop Oversized Tees at 10:00, City Runner Joggers at 14:00, and a Weekend Hoodie restock at 19:00.";
  }

  const product = bestProductFor(text);
  return `My pick: ${product.name}. It is a ${product.fit.toLowerCase()} style at ${formatPrice(product.price)}. Search its name or use the filters to find it fast.`;
}

function handleChatSubmit(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  addChatMessage(trimmed, "user");
  chatInput.value = "";
  window.setTimeout(() => addChatMessage(getBotReply(trimmed)), 220);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart");
  if (!button) return;
  cart.push(products[Number(button.dataset.index)]);
  renderCart();
  openCart();
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest(".remove-item");
  if (!button) return;
  cart.splice(Number(button.dataset.index), 1);
  renderCart();
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
scrim.addEventListener("click", hideCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideCart();
    hideChat();
  }
});

renderProducts();
renderCart();
addChatMessage("Hey, I am Vibe Guide. Ask me for sizing help, gift ideas, drop timings, shipping details, or cart info.");

chatLauncher.addEventListener("click", () => {
  if (chatWindow.classList.contains("open")) {
    hideChat();
  } else {
    openChat();
  }
});

closeChat.addEventListener("click", hideChat);

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleChatSubmit(chatInput.value);
});

quickPrompts.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-prompt]");
  if (!button) return;
  handleChatSubmit(button.dataset.prompt);
});
