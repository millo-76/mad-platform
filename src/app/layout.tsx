import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mad Made Photography",
  description: "Home, gallery, and contact framework for a portfolio site.",
};

const navigation = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
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
          <header className="site-header">
            <div className="container nav-row">
              <Link href="/" className="brand" aria-label="Mad Made Photography home">
                Mad Made Photography
              </Link>
              <nav aria-label="Main navigation">
                <ul className="nav-list">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>

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