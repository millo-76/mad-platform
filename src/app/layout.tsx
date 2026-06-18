import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Mad Made Photography",
  description: "Home, gallery, about, and contact framework for a portfolio site.",
};

const navigation = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-wrapper">
          <SiteHeader navigation={navigation} />

          <div className="container content">{children}</div>

          <footer className="site-footer">
            <div className="container">
              <p>© {new Date().getFullYear()} Mad Made Photography. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}