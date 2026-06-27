"use client";

import { useMemo, useState } from "react";
import { fallbackProducts } from "../../lib/products";
import { useCart } from "../components/CartContext"; 
import { storefront } from "../../lib/storefront";

import {
  HeroSection,
  PromoStrip,
  CategoriesSection,
  DropsSection,
  ProductShowcase,
  PerksSection,
} from "../components";

export default function PerfumePage() {
   const { addToCart } = useCart();
  // Local rendering state for perfumes page.
  // Cart actions + real product loading live in AppLayout; this page owns only filtering.
  const [filter, setFilter] = useState("all");

  const products = fallbackProducts;
  const source = "fallback";

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      // Perfumes page should show only perfume-type items.
      const matchesPerfumeType = product.type === "perfume";
      const matchesFilter = filter === "all" || product.type === filter;
      return matchesPerfumeType && matchesFilter;
    });
  }, [filter, products]);

  return (
    <>
      <HeroSection content={storefront.hero} featuredProducts={products.filter((p) => p.type === "perfume").slice(0, 3)} />

      <PromoStrip content={storefront.promo} source={source} />

      <CategoriesSection content={storefront.categories} />

      <DropsSection content={storefront.drops} />

      <ProductShowcase
        content={storefront.products}
        filters={storefront.filters}
        filter={filter}
        setFilter={setFilter}
        products={visibleProducts}
        addToCart={addToCart}
      />

      <PerksSection content={storefront.perks} />
    </>
  );
}

