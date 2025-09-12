"use server";

import { cookies } from "next/headers";
import { addItem, removeItem, clearCart as clearCartStore } from "@/lib/cart";
import { revalidatePath } from "next/cache";

async function getSid() {
  const jar = await cookies();
  let sid = jar.get("sid")?.value;
  if (!sid) {
    sid = Math.random().toString(36).slice(2);
    // Session cookie, not httpOnly to keep the demo simple
    jar.set("sid", sid, { path: "/", sameSite: "lax" });
  }
  return sid;
}

export async function addToCart(bookId) {
  const sid = await getSid();
  addItem(sid, bookId, 1);
  revalidatePath("/caching/cart");
}

export async function removeFromCart(bookId) {
  const sid = await getSid();
  removeItem(sid, bookId, 1);
  revalidatePath("/caching/cart");
}

export async function clearCart() {
  const sid = await getSid();
  clearCartStore(sid);
  revalidatePath("/caching/cart");
}
