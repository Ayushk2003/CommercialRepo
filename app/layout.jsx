import "./globals.css";

export const metadata = {
  title: "VibeVault Streetwear",
  description: "Interactive streetwear ecommerce storefront with Supabase and Razorpay checkout."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
