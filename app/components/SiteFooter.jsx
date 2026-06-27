"use client";

import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer-horizontal">
      {/* LEFT SECTION - Contact Info */}
      <div className="footer-left">
        <div className="footer-branding">
          <h3>VibeVault</h3>
          <p>Curated Fragrances & Moments</p>
        </div>
        <div className="footer-contact">
          <a href="mailto:hello@vibevault.com" className="contact-link">
            <Mail size={16} />
            hello@vibevault.com
          </a>
          <a href="tel:+919876543210" className="contact-link">
            <Phone size={16} />
            +91 9876 543 210
          </a>
          <div className="contact-link">
            <MapPin size={16} />
            Mumbai, India
          </div>
        </div>
      </div>

      {/* CENTER SECTION - Links */}
      <div className="footer-center">
        <div className="footer-column">
          <h4>Shop</h4>
          <a href="/">Perfumes</a>
          <a href="/discovery">Discovery Sets</a>
          <a href="/#bestsellers">Bestsellers</a>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <a href="#faq">FAQ</a>
          <a href="#returns">Returns</a>
          <a href="#shipping">Shipping</a>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
        <div className="footer-column">
          <h4>Follow</h4>
          <div className="social-links-footer">
            <a href="https://instagram.com/vibevault" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com/vibevault" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com/vibevault" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - Payment Methods & Copyright */}
      <div className="footer-right">
        <div className="payment-section">
          <p className="payment-label">We Accept</p>
          <div className="payment-icons-footer">
            <div className="payment-icon" title="Credit Card">💳</div>
            <div className="payment-icon" title="UPI">📱</div>
            <div className="payment-icon" title="Bank Transfer">🏦</div>
            <div className="payment-icon" title="Razorpay">💰</div>
          </div>
        </div>
        <p className="copyright-footer">
          © {new Date().getFullYear()} VibeVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}