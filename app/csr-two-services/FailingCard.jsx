"use client";

import InlineErrorBoundary from "./InlineErrorBoundary";
import ServiceCard from "./ServiceCard";

export default function FailingCard() {
  return (
    <InlineErrorBoundary>
      <ServiceCard
        title="Service B (fails; inline boundary)"
        endpoint="/api/books/999"
        description="This client fetch intentionally 404s; error is caught inside the card."
      />
    </InlineErrorBoundary>
  );
}

