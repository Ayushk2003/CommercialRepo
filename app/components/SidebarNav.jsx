import Link from "next/link";
import { BookOpenText, Shirt, Sparkles, Wand2 } from "lucide-react";

export default function SidebarNav({ active = "perfume", onNavigate }) {
  return (
    <aside className="sidebar-nav" aria-label="Site navigation">
      <div className="sidebar-toolbar">
        <div className="sidebar-title">Menu</div>

        <nav className="sidebar-links">
          <Link
            href="/"
            className={`sidebar-link ${active === "perfume" ? "active" : ""}`}
            onClick={() => onNavigate?.("perfume")}
          >
            <span className="sidebar-ico" aria-hidden="true"><Sparkles size={18} /></span>
            Perfumes
          </Link>

          <Link
            href="/discovery"
            className={`sidebar-link ${active === "discovery" ? "active" : ""}`}
            onClick={() => onNavigate?.("discovery")}
          >
            <span className="sidebar-ico" aria-hidden="true"><Wand2 size={18} /></span>
            Discovery sets
          </Link>

          <Link
            href="/clothing"
            className={`sidebar-link ${active === "clothing" ? "active" : ""}`}
            onClick={() => onNavigate?.("clothing")}
          >
            <span className="sidebar-ico" aria-hidden="true"><Shirt size={18} /></span>
            Clothing (coming soon)
          </Link>

          <a className="sidebar-link" href="#perks" onClick={() => onNavigate?.("perks")}
          >
            <span className="sidebar-ico" aria-hidden="true"><BookOpenText size={18} /></span>
            Why VibeVault
          </a>
        </nav>
      </div>
    </aside>
  );
}


