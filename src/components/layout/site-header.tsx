import Image from "next/image";
import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  navigation: NavItem[];
};

export function SiteHeader({ navigation }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link href="/" className="brand" aria-label="Mad Made Photography home">
          <Image
            src="/mad-made-logo-no-bg.png"
            alt="Mad Made Photography logo"
            width={691}
            height={224}
            className="brand-logo"
            priority
          />
        </Link>

        <nav className="site-nav desktop-nav" aria-label="Main navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="mobile-menu">
          <summary className="mobile-menu-button" aria-label="Toggle navigation menu">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </summary>

          <nav className="mobile-nav" aria-label="Mobile navigation">
            <ul className="nav-list">
              {navigation.map((item) => (
                <li key={`mobile-${item.href}`}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
