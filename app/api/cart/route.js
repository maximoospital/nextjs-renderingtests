import { cookies } from "next/headers";
import { getOrCreateCart, serializeCart } from "@/lib/cart";

export const dynamic = "force-dynamic"; // never cache at the route level

export async function GET() {
  const jar = await cookies();
  let sid = jar.get("sid")?.value;
  if (!sid) {
    sid = Math.random().toString(36).slice(2);
    jar.set("sid", sid, { path: "/", sameSite: "lax" });
  }
  // Touch the cart to ensure it exists
  getOrCreateCart(sid);
  const body = {
    serverNow: new Date().toISOString(),
    cart: serializeCart(sid),
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
