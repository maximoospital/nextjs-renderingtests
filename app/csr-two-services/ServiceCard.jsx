"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ServiceCard({ title, endpoint, description }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setData(null);
    fetch(endpoint, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Fetch failed (${res.status}): ${text || res.statusText}`);
        }
        return res.json();
      })
      .then((json) => {
        if (isMounted) setData(json);
      })
      .catch((e) => {
        if (isMounted) setError(e);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  // Throw during render to allow an error boundary up the tree to catch
  if (error) throw error;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
          {description && (
            <div style={{ fontSize: 12, color: "#666" }}>{description}</div>
          )}
          {loading && <div>Loading…</div>}
          {!loading && data && (
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

