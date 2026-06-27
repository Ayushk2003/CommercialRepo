import { Menu, Search, ShoppingBag } from "lucide-react";

export default function SiteHeader({ brand, cartCount, mobileNavOpen, navItems, query, searchPlaceholder, setMobileNavOpen, setQuery, openCart }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={brand.ariaLabel}>
        <span className="brand-mark">{brand.mark}</span>
        <span>{brand.name}</span>
      </a>

      <nav className={`main-nav ${mobileNavOpen ? "open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>

      <div className="header-actions">
        <label className="search">
          <Search size={18} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={searchPlaceholder} />
        </label>
        <button className="icon-button mobile-menu" type="button" onClick={() => setMobileNavOpen((value) => !value)} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <button className="icon-button" type="button" onClick={openCart} aria-label="Open cart">
          <ShoppingBag size={20} />
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
