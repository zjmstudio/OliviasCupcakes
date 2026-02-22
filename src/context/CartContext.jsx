// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "olivias_cart_v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function isSameConfig(a, b) {
  if (!a || !b) return false;
  return (
    a.base === b.base &&
    a.frosting === b.frosting &&
    (a.topping1 || "none") === (b.topping1 || "none") &&
    (a.topping2 || "none") === (b.topping2 || "none")
  );
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = safeParse(localStorage.getItem(STORAGE_KEY) || "[]", []);
    return Array.isArray(stored) ? stored : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (item) => {
    const normalized = {
      id: item.id || uid(),
      type: item.type || "preset",
      name: item.name || "Cupcake",
      price: Number(item.price || 0),
      qty: Math.max(1, Number(item.qty || 1)),
      config: item.config || null,
      createdAt: item.createdAt || Date.now(),
    };

    setItems((prev) => {
      const next = [...prev];

      const canMerge =
        normalized.type === "custom" &&
        normalized.config &&
        normalized.price >= 0;

      if (canMerge) {
        const idx = next.findIndex(
          (x) => x.type === "custom" && x.price === normalized.price && isSameConfig(x.config, normalized.config)
        );
        if (idx !== -1) {
          next[idx] = { ...next[idx], qty: next[idx].qty + normalized.qty };
          return next;
        }
      }

      const canMergePreset =
        normalized.type !== "custom" && normalized.id;

      if (canMergePreset) {
        const idx = next.findIndex((x) => x.type !== "custom" && x.id === normalized.id);
        if (idx !== -1) {
          next[idx] = { ...next[idx], qty: next[idx].qty + normalized.qty };
          return next;
        }
      }

      return [...next, normalized];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const clearCart = () => setItems([]);

  const updateQty = (id, qty) => {
    const n = Number(qty);
    if (!Number.isFinite(n)) return;

    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: Math.max(1, Math.floor(n)) } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const increment = (id) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  };

  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, x) => sum + (Number(x.price) || 0) * (Number(x.qty) || 0), 0);
  }, [items]);

  const count = useMemo(() => {
    return items.reduce((sum, x) => sum + (Number(x.qty) || 0), 0);
  }, [items]);

  const value = useMemo(() => {
    return {
      items,
      addToCart,
      removeFromCart,
      clearCart,
      updateQty,
      increment,
      decrement,
      subtotal,
      count,
    };
  }, [items, subtotal, count]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>.");
  }
  return ctx;
}