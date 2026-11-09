import { create } from "zustand";

const STORAGE_KEY = "shop-cart";

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: readCart(),
  addItem: (product) => set((state) => {
    const exists = state.items.some((item) => item.id === product.id);
    return {
      items: exists
        ? state.items.map((item) => item.id === product.id
            ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.items, {
            id: product.id, title: product.title, price: product.price, quantity: 1
          }]
    };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),
  setQuantity: (id, quantity) => set((state) => ({
    items: quantity < 1
      ? state.items.filter((item) => item.id !== id)
      : state.items.map((item) => item.id === id ? { ...item, quantity } : item)
  })),
  clear: () => set({ items: [] })
}));

// Persist outside React through the store subscription.
useCartStore.subscribe((state, previousState) => {
  if (state.items !== previousState.items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore unavailable storage.
    }
  }
});