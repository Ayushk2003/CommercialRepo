"use client";

import { createContext, useContext } from "react";

// ✅ CORRECT - Named export
export const CartContext = createContext();

// ✅ CORRECT - Named export hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartContext.Provider");
  }
  return context;
}