"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Bot, CheckCircle2, CreditCard, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { fallbackProducts, formatPrice } from "../lib/products";

const filters = [
  { label: "All", value: "all" },
  { label: "Tees", value: "tees" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Accessories", value: "accessories" }
];

const quickPrompts = ["Gift under Rs 1000", "Oversized fit?", "Shipping and returns"];

function ProductShape({ product }) {
  return <div className={`mock-${product.shape || "shirt"}`} style={{ "--item-color": product.color }} />;
}

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);
  const [source, setSource] = useState("fallback");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hey, I am Vibe Guide. Ask me about sizing, gifts, drops, shipping, or checkout." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [checkoutStatus, setCheckoutStatus] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || fallbackProducts);
        setSource(data.source || "fallback");
      })
      .catch(() => setProducts(fallbackProducts));
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("vibevault-cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("vibevault-cart", JSON.stringify(cart));
  }, [cart]);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesFilter = filter === "all" || product.type === filter;
      const matchesSearch = [product.name, product.type, product.fit, product.tag].join(" ").toLowerCase().includes(normalized);
      return matchesFilter && matchesSearch;
    });
  }, [filter, products, query]);

  const cartLines = useMemo(() => {
    return cart.reduce((lines, item) => {
      const existing = lines.find((line) => line.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        lines.push({ ...item, quantity: 1 });
      }
      return lines;
    }, []);
  }, [cart]);

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  function addToCart(product) {
    setCart((items) => [...items, product]);
    setCartOpen(true);
  }

  function removeOne(productId) {
    const index = cart.findIndex((item) => item.id === productId);
    if (index === -1) return;
    setCart((items) => items.filter((_, itemIndex) => itemIndex !== index));
  }

  function getBotReply(input) {
    const text = input.toLowerCase();
    if (text.includes("shipping") || text.includes("return") || text.includes("cod")) {
      return "Shipping is free over Rs 999, COD can be added later, and returns stay easy for 15 days.";
    }
    if (text.includes("size") || text.includes("fit") || text.includes("oversized")) {
      return "For a relaxed look, pick your usual size. For bigger drop shoulders, go one size up. Oversized styles are already cut roomier.";
    }
    if (text.includes("gift") || text.includes("1000")) {
      const pick = products.filter((product) => product.price <= 1000).sort((a, b) => b.price - a.price)[0];
      return pick ? `Gift pick: ${pick.name} at ${formatPrice(pick.price)}. It feels premium without crossing Rs 1000.` : "Try accessories or graphic tees for gifting.";
    }
    if (text.includes("checkout") || text.includes("cart")) {
      return cart.length ? `Your cart has ${cart.length} item${cart.length > 1 ? "s" : ""} worth ${formatPrice(subtotal)}.` : "Your cart is empty. Start with the Neo Pop Tee or Weekend Hoodie.";
    }
    return "My pick right now is the Neo Pop Oversized Tee: loud graphic, easy fit, fast add-to-cart energy.";
  }

  function sendChat(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setChatMessages((messages) => [...messages, { sender: "user", text: trimmed }, { sender: "bot", text: getBotReply(trimmed) }]);
    setChatInput("");
  }

  async function startCheckout() {
    if (!cartLines.length) return;
    setCheckoutStatus("Creating Razorpay order...");

    const loaded = await loadRazorpay();
    if (!loaded) {
      setCheckoutStatus("Could not load Razorpay checkout. Check your network and try again.");
      return;
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartLines, customer })
    });
    const data = await response.json();

    if (!response.ok) {
      setCheckoutStatus(data.error || "Checkout is not configured yet.");
      return;
    }

    const razorpay = new window.Razorpay({
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      name: "VibeVault",
      description: "Streetwear checkout",
      order_id: data.orderId,
      prefill: customer,
      theme: { color: "#e63946" },
      handler: async (payment) => {
        const verify = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payment)
        });
        const result = await verify.json();
        setCheckoutStatus(result.verified ? "Payment verified. Order saved." : "Payment received, but verification failed.");
        if (result.verified) {
          setCart([]);
        }
      }
    });

    razorpay.open();
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="VibeVault home">
          <span className="brand-mark">VV</span>
          <span>VibeVault</span>
        </a>

        <nav className={`main-nav ${mobileNavOpen ? "open" : ""}`} aria-label="Primary navigation">
          <a href="#drops">New Drops</a>
          <a href="#categories">Categories</a>
          <a href="#bestsellers">Bestsellers</a>
          <a href="#perks">Perks</a>
        </nav>

        <div className="header-actions">
          <label className="search">
            <Search size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search tees, hoodies, joggers" />
          </label>
          <button className="icon-button mobile-menu" type="button" onClick={() => setMobileNavOpen((value) => !value)} aria-label="Toggle menu">
            <Menu size={20} />
          </button>
          <button className="icon-button" type="button" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <ShoppingBag size={20} />
            <span className="cart-count">{cart.length}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="heroTitle">
          <img src="/assets/hero.png" alt="Models wearing original streetwear outfits" />
          <div className="hero-copy">
            <p className="eyebrow">Original streetwear, fresh drops weekly</p>
            <h1 id="heroTitle">Wear the fandom. Own the street.</h1>
            <p className="hero-subtitle">Graphic tees, oversized fits, hoodies, joggers, and accessories made for everyday main-character energy.</p>
            <div className="hero-actions">
              <a className="button primary" href="#bestsellers">Shop Bestsellers <ArrowRight size={18} /></a>
              <a className="button secondary" href="#categories">Explore Categories</a>
            </div>
          </div>
        </section>

        <section className="promo-strip" aria-label="Store benefits">
          <span>Free shipping over Rs 999</span>
          <span>Easy 15-day returns</span>
          <span>Razorpay checkout</span>
          <span>{source === "supabase" ? "Live inventory" : "Demo inventory"}</span>
        </section>

        <section className="section" id="categories" aria-labelledby="categoriesTitle">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Shop by mood</p>
              <h2 id="categoriesTitle">Fan-favorite categories</h2>
            </div>
            <a className="text-link" href="#bestsellers">View all products</a>
          </div>
          <div className="category-grid">
            <article className="category-tile tall">
              <img src="/assets/tees.png" alt="Original graphic t-shirts arranged for shopping" />
              <div><span>Graphic Tees</span><strong>Oversized, relaxed, and regular fits</strong></div>
            </article>
            <article className="category-tile">
              <img src="/assets/accessories.png" alt="Streetwear accessories arranged as a flat lay" />
              <div><span>Accessories</span><strong>Caps, bags, mugs, socks, and phone cases</strong></div>
            </article>
            <article className="mini-category red"><span>Hoodies</span><strong>Soft fleece layers</strong></article>
            <article className="mini-category teal"><span>Joggers</span><strong>Weekend-ready comfort</strong></article>
            <article className="mini-category yellow"><span>Women</span><strong>Easy street fits</strong></article>
          </div>
        </section>

        <section className="section compact" id="drops" aria-labelledby="dropsTitle">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Just landed</p>
              <h2 id="dropsTitle">Today's drop board</h2>
            </div>
          </div>
          <div className="drop-board">
            {["Neo Pop Oversized Tees", "City Runner Joggers", "Weekend Hoodie Restock"].map((title, index) => (
              <article key={title}>
                <span className="drop-time">{["10:00", "14:00", "19:00"][index]}</span>
                <strong>{title}</strong>
                <p>{["Color-block graphics in five new shades.", "Lightweight utility pockets and relaxed taper.", "Black, cherry, teal, and ash grey return tonight."][index]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="bestsellers" aria-labelledby="bestsellersTitle">
          <div className="section-heading product-heading">
            <div>
              <p className="eyebrow">Trending now</p>
              <h2 id="bestsellersTitle">Bestsellers</h2>
            </div>
            <div className="filter-tabs" aria-label="Product filters">
              {filters.map((item) => (
                <button className={`filter ${filter === item.value ? "active" : ""}`} key={item.value} type="button" onClick={() => setFilter(item.value)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-art" style={{ "--art-bg": product.bg }}>
                  <span className="product-tag">{product.tag}</span>
                  <ProductShape product={product} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="meta"><span>{product.fit}</span><span className="price">{formatPrice(product.price)}</span></div>
                  <button className="button primary full" type="button" onClick={() => addToCart(product)}>
                    <Plus size={18} /> Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
          {!visibleProducts.length && <p className="empty-state">No matching products found.</p>}
        </section>

        <section className="perks" id="perks" aria-labelledby="perksTitle">
          <div>
            <p className="eyebrow">Why shoppers come back</p>
            <h2 id="perksTitle">Built for daily rotation</h2>
          </div>
          <ul>
            <li><Sparkles size={24} /><strong>Original designs</strong><span>No copied characters or brand marks.</span></li>
            <li><CheckCircle2 size={24} /><strong>Fit-first sizing</strong><span>Clear fit notes across relaxed, regular, and oversized styles.</span></li>
            <li><CreditCard size={24} /><strong>Payment ready</strong><span>Razorpay order creation and Supabase order storage are wired in.</span></li>
          </ul>
        </section>
      </main>

      <aside className={`cart-panel ${cartOpen ? "open" : ""}`} aria-label="Shopping cart" aria-hidden={!cartOpen}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="icon-button ghost" type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button>
        </div>
        <div className="cart-items">
          {!cartLines.length && <p className="empty-state">Your cart is waiting for a fresh fit.</p>}
          {cartLines.map((item) => (
            <div className="cart-row" key={item.id}>
              <div><strong>{item.name}</strong><span>{item.fit} - {formatPrice(item.price)} x {item.quantity}</span></div>
              <button className="icon-button small" type="button" onClick={() => removeOne(item.id)} aria-label={`Remove ${item.name}`}><Minus size={16} /></button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="customer-fields">
            <input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Name" />
            <input value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} placeholder="Email" type="email" />
            <input value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="Phone" />
          </div>
          <div className="total-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          {checkoutStatus && <p className="checkout-status">{checkoutStatus}</p>}
          <button className="button primary full" type="button" onClick={startCheckout} disabled={!cartLines.length}>
            <CreditCard size={18} /> Checkout with Razorpay
          </button>
        </div>
      </aside>

      <section className="chatbot" aria-label="VibeVault chat assistant">
        <button className="chat-launcher" type="button" onClick={() => setChatOpen((value) => !value)} aria-expanded={chatOpen}>
          <Bot size={20} /><strong>Need help?</strong>
        </button>
        <div className={`chat-window ${chatOpen ? "open" : ""}`} aria-hidden={!chatOpen}>
          <div className="chat-topbar">
            <div><span className="chat-status" /><strong>Vibe Guide</strong><small>React shopping assistant</small></div>
            <button className="icon-button ghost small-icon" type="button" onClick={() => setChatOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </div>
          <div className="chat-messages" role="log" aria-live="polite">
            {chatMessages.map((message, index) => <div className={`chat-message ${message.sender}`} key={`${message.sender}-${index}`}>{message.text}</div>)}
          </div>
          <div className="quick-prompts" aria-label="Quick chat prompts">
            {quickPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => sendChat(prompt)}>{prompt}</button>)}
          </div>
          <form className="chat-form" onSubmit={(event) => { event.preventDefault(); sendChat(chatInput); }}>
            <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} type="text" placeholder="Ask about size, gifts, drops..." />
            <button className="button primary" type="submit">Send</button>
          </form>
        </div>
      </section>

      <div className={`scrim ${cartOpen ? "visible" : ""}`} onClick={() => setCartOpen(false)} />
    </>
  );
}
