import { CreditCard, Minus, X } from "lucide-react";
import { formatPrice } from "../../lib/products";

export default function CartPanel({ cartOpen, cartLines, customer, setCustomer, subtotal, checkoutStatus, removeOne, startCheckout, closeCart, emptyText }) {
  return (
    <aside className={`cart-panel ${cartOpen ? "open" : ""}`} aria-label="Shopping cart" aria-hidden={!cartOpen}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="icon-button ghost" type="button" onClick={closeCart} aria-label="Close cart"><X size={20} /></button>
      </div>
      <div className="cart-items">
        {!cartLines.length && <p className="empty-state">{emptyText}</p>}
        {cartLines.map((item) => (
          <div className="cart-row" key={item.id}>
            <div><strong>{item.name}</strong><span>{item.fit} - {formatPrice(item.price)} x {item.quantity}</span></div>
            <button className="icon-button small" type="button" onClick={() => removeOne(item.id)} aria-label={`Remove ${item.name}`}><Minus size={16} /></button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="total-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
        {checkoutStatus && <p className="checkout-status">{checkoutStatus}</p>}
        <button className="button primary full" type="button" onClick={startCheckout} disabled={!cartLines.length}>
          <CreditCard size={18} /> Checkout with Razorpay
        </button>
      </div>
    </aside>
  );
}
