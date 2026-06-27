export default function ProductShape({ product }) {
  return (
    <div className={`mock-product mock-${product.shape || "bottle"}`} style={{ "--item-color": product.color }}>
      <span className="mock-cap" />
      <span className="mock-label" />
    </div>
  );
}
