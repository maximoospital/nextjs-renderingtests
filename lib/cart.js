// Minimal, in-memory cart store keyed by a session id.

import { books } from "./faux-db";

// Persist in-memory store across dev HMR by stashing on globalThis
const globalStore = globalThis;
const carts = globalStore.__carts || new Map(); // sid -> { items: Map<bookId, qty> }
if (process.env.NODE_ENV !== "production") {
  globalStore.__carts = carts;
}

export function getOrCreateCart(sid) {
  if (!carts.has(sid)) {
    carts.set(sid, { items: new Map() });
  }
  return carts.get(sid);
}

export function addItem(sid, bookId, qty = 1) {
  const cart = getOrCreateCart(sid);
  const cur = cart.items.get(bookId) || 0;
  cart.items.set(bookId, cur + qty);
  return cart;
}

export function removeItem(sid, bookId, qty = 1) {
  const cart = getOrCreateCart(sid);
  const cur = cart.items.get(bookId) || 0;
  const next = Math.max(0, cur - qty);
  if (next === 0) cart.items.delete(bookId);
  else cart.items.set(bookId, next);
  return cart;
}

export function clearCart(sid) {
  const cart = getOrCreateCart(sid);
  cart.items.clear();
  return cart;
}

export function serializeCart(sid) {
  const cart = getOrCreateCart(sid);
  const lines = [];
  let total = 0;
  for (const [bookId, qty] of cart.items.entries()) {
    const book = books.find((b) => b.id === bookId);
    if (!book) continue;
    const lineTotal = +(book.price * qty).toFixed(2);
    total += lineTotal;
    lines.push({ id: book.id, title: book.title, price: book.price, qty, lineTotal });
  }
  return { lines, total: +total.toFixed(2) };
}
