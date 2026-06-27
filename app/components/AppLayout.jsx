"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { storefront } from "../../lib/storefront";
import { CartContext } from "./CartContext"; // Import from components
import { CartPanel, Chatbot, SidebarNav, SiteHeader, SiteFooter } from "./";
import { fallbackProducts } from "../../lib/products";

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

export default function AppLayout({ children }) {
  const pathname = usePathname(); // ✅ Get current page
  const [products, setProducts] = useState(fallbackProducts);
  const [source, setSource] = useState("fallback");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: storefront.chat.initialMessage }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [checkoutStatus, setCheckoutStatus] = useState("");

  // ✅ Determine active section based on pathname
  const getActiveSection = () => {
    if (pathname.includes("/discovery")) return "discovery";
    if (pathname.includes("/clothing")) return "clothing";
    return "perfume";
  };

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
    let frame = 0;
    function syncScrollAmbience() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(window.scrollY / maxScroll, 1);
        document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(3));
        document.documentElement.style.setProperty("--scroll-hue", `${Math.round(progress * 42)}deg`);
      });
    }
    syncScrollAmbience();
    window.addEventListener("scroll", syncScrollAmbience, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncScrollAmbience);
    };
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
      return "Shipping is free over Rs 999, returns stay easy for 15 days, and perfume bottles are packed carefully before dispatch.";
    }
    if (text.includes("long") || text.includes("lasting") || text.includes("projection")) {
      return "For longer wear, choose Amber Muse or Noir Bloom. Apply on pulse points and a little on fabric for a softer trail.";
    }
    if (text.includes("fresh") || text.includes("daily") || text.includes("office")) {
      return "Try Citrus Veil for bright daily freshness or Linen Cloud for a clean, soft, close-to-skin scent.";
    }
    if (text.includes("gift") || text.includes("1500") || text.includes("1000")) {
      const budget = text.includes("1000") ? 1000 : 1500;
      const pick = products
        .filter((product) => product.price > 0 && product.price <= budget)
        .sort((a, b) => b.price - a.price)[0];
      return pick
        ? `Gift pick: ${pick.name} at ${pick.price.toLocaleString("en-IN")}. It is an easy, premium choice within Rs ${budget.toLocaleString("en-IN")}.`
        : "Try a discovery set for gifting when you are unsure about notes.";
    }
    if (text.includes("checkout") || text.includes("cart")) {
      return cart.length
        ? `Your cart has ${cart.length} item${cart.length > 1 ? "s" : ""} worth ${subtotal.toLocaleString("en-IN")}.`
        : "Your cart is empty. Start with Amber Muse or the Discovery Scent Wardrobe.";
    }
    if (text.includes("clothing") || text.includes("shirt") || text.includes("hoodie")) {
      return "Clothing is planned as the next rollout. For now, the store leads with perfume and keeps the clothing category warm for launch.";
    }
    return storefront.chat.defaultReply;
  }

  function sendChat(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setChatMessages((messages) => [
      ...messages,
      { sender: "user", text: trimmed },
      { sender: "bot", text: getBotReply(trimmed) }
    ]);
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
      description: storefront.cart.checkoutDescription,
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
        setCheckoutStatus(
          result.verified ? "Payment verified. Order saved." : "Payment received, but verification failed."
        );
        if (result.verified) {
          setCart([]);
        }
      }
    });

    razorpay.open();
  }

  return (
    <CartContext.Provider value={{ addToCart, removeOne, cart, setCartOpen }}>
      <>
        {/* ✅ Pass actual props, not {...props} */}
        <SiteHeader
          brand={storefront.brand}
          cartCount={cart.length}
          mobileNavOpen={mobileNavOpen}
          navItems={storefront.navigation}
          query={query}
          searchPlaceholder={storefront.searchPlaceholder}
          setMobileNavOpen={setMobileNavOpen}
          setQuery={setQuery}
          openCart={() => setCartOpen(true)}
          sidebarDrawerOpen={sidebarDrawerOpen}
          setSidebarDrawerOpen={setSidebarDrawerOpen}
        />

        <main id="top" className="page-container">
          {children}
        </main>

        <CartPanel
          cartOpen={cartOpen}
          cartLines={cartLines}
          customer={customer}
          setCustomer={setCustomer}
          subtotal={subtotal}
          checkoutStatus={checkoutStatus}
          removeOne={removeOne}
          startCheckout={startCheckout}
          closeCart={() => setCartOpen(false)}
          emptyText={storefront.cart.empty}
        />

        <Chatbot
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          sendChat={sendChat}
          content={storefront.chat}
        />

        <div
          className={`sidebar-drawer-overlay ${sidebarDrawerOpen ? "open" : ""}`}
          onClick={() => setSidebarDrawerOpen(false)}
          aria-hidden={!sidebarDrawerOpen}
        />

        <div
          className={`sidebar-drawer ${sidebarDrawerOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
        >
          {/* ✅ Pass dynamic active section */}
          <SidebarNav 
            active={getActiveSection()}
            onNavigate={() => setSidebarDrawerOpen(false)} 
          />
        </div>

        <div className={`scrim ${cartOpen ? "visible" : ""}`} onClick={() => setCartOpen(false)} />

        <SiteFooter />
      </>
    </CartContext.Provider>
  );
}