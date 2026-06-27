export default function CommingSoon() {
  return (
    <section className="section" id="clothing-inline" style={{ paddingTop: 72 }}>
      <div className="section-heading">
        <h1 style={{ color: "#141414" }}>Streetwear, built like a scent story</h1>
      </div>

      <p style={{ maxWidth: 720, color: "#68686f", fontWeight: 700, lineHeight: 1.7 }}>
        Cooming Soon page for drops—designed to match the same mood, notes, and daily rhythm as our perfumes.
      </p>

      <div style={{ marginTop: 22 }}>
        <p style={{ fontWeight: 850, color: "#2454ff" }}>Clothing is coming soon.</p>
      </div>

      <div style={{ marginTop: 18, display: "grid", gap: 10, maxWidth: 720 }}>
        <div style={{ background: "rgba(36,84,255,0.08)", borderRadius: 14, padding: "14px 16px" }}>
          <strong>Vibe → Fit</strong>
          <div style={{ color: "#68686f", fontWeight: 700, marginTop: 6 }}>
            Amber for warm trails, citrus for fresh mornings—now in everyday street silhouettes.
          </div>
        </div>

        <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: 14, padding: "14px 16px" }}>
          <strong>Limited first release</strong>
          <div style={{ color: "#68686f", fontWeight: 700, marginTop: 6 }}>
            Small drops so we can perfect fabric feel, sizing, and color under real lighting.
          </div>
        </div>
      </div>
    </section>
  );
}


