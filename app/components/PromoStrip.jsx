export default function PromoStrip({ content, source }) {
  return (
    <section className="promo-strip" aria-label={content.label}>
      {content.items.map((item) => <span key={item}>{item}</span>)}
      <span>{source === "supabase" ? content.inventoryLabels.supabase : content.inventoryLabels.fallback}</span>
    </section>
  );
}
