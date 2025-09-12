"use client";

import { Component } from "react";

export default class InlineErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("InlineErrorBoundary caught:", error, info);
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 12, borderRadius: 8, background: "#fff5f5", border: "1px solid #ffd6d6" }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Card Error</div>
          <div style={{ fontSize: 14, marginBottom: 8 }}>
            {this.state.error?.message || "Something went wrong while rendering this card."}
          </div>
          <button onClick={this.reset} style={{ padding: "6px 10px", border: "1px solid #ccc", borderRadius: 6 }}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

