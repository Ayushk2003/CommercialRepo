import "./globals.css";
import AppLayout from "./components/AppLayout";

export const metadata = {
  title: "VibeVault Streetwear",
  description: "Interactive streetwear ecommerce storefront with Supabase and Razorpay checkout."
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}



