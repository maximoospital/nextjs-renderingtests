"use client";

import ServiceCard from "./ServiceCard";

export default function GoodCard() {
  return (
    <ServiceCard
      title="Service A (success)"
      endpoint="/api/books/1"
      description="Client fetch to a working endpoint; renders data normally."
    />
  );
}

