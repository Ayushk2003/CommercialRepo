import { ArrowRight } from "lucide-react";
import ProductShape from "./ProductShape";

export default function HeroSection({ content, featuredProducts }) {
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <div className="hero-copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="heroTitle">{content.title}</h1>
        <p className="hero-subtitle">{content.subtitle}</p>
        <div className="hero-actions">
          <a className="button primary" href={content.primaryAction.href}>{content.primaryAction.label} <ArrowRight size={18} /></a>
          <a className="button secondary" href={content.secondaryAction.href}>{content.secondaryAction.label}</a>
        </div>
      </div>
      <div className="hero-display" aria-label={content.alt}>
        {featuredProducts.map((product, index) => (
          <div className={`hero-product hero-product-${index}`} key={product.id} style={{ "--art-bg": product.bg }}>
            <ProductShape product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
