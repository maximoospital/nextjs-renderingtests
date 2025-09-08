import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const { path } = await request.json();
    if (!path) {
      return new Response(JSON.stringify({ error: "Missing path" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    revalidatePath(path);
    return new Response(JSON.stringify({ revalidated: true, path }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

