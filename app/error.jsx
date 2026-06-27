"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optional: could log error to an observability service.
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ fontWeight: 950, color: "#e63946", marginBottom: 10 }}>
        Something went wrong.
      </div>
      <div style={{ color: "#68686f", lineHeight: 1.6, marginBottom: 16 }}>
        {error?.message || "Unexpected error"}
      </div>
      <button
        className="button primary"
        type="button"
        onClick={() => reset()}
      >
        Retry
      </button>
    </div>
  );
}

