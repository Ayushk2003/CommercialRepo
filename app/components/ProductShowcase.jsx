import { Plus } from "lucide-react";
import { formatPrice } from "../../lib/products";
import ProductShape from "./ProductShape";

export default function ProductShowcase({ content, filters, filter, setFilter, products, addToCart }) {
  return (
    <section className="section product-store" id="bestsellers" aria-labelledby="bestsellersTitle">
      <div className="section-heading product-heading">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="bestsellersTitle">{content.title}</h2>
        </div>
        <div className="filter-tabs" aria-label="Product filters">
          {filters.map((item) => (
            <button className={`filter ${filter === item.value ? "active" : ""}`} key={item.value} type="button" onClick={() => setFilter(item.value)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="store-stage">
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-art" style={{ "--art-bg": product.bg }}>
                <span className="product-tag">{product.tag}</span>
                <ProductShape product={product} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="meta"><span>{product.fit}</span><span className="price">{product.price ? formatPrice(product.price) : "Soon"}</span></div>
                <button className="button primary full" type="button" onClick={() => addToCart(product)} disabled={!product.price}>
                  <Plus size={18} /> {product.price ? "Add to Cart" : "Coming Soon"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {!products.length && <p className="empty-state">{content.empty}</p>}
    </section>
  );
}
