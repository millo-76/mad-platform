import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteSettings, type SiteNavigationItem, type SiteSocialLink } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Mad Made Photography",
  description: "Home, gallery, about, and contact framework for a portfolio site.",
};

const fallbackNavigation: SiteNavigationItem[] = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const supportedSocialIcons: Record<string, { label: string; path: string }> = {
  instagram: {
    label: "Instagram",
    path: "M7 2.5h10A4.5 4.5 0 0 1 21.5 7v10a4.5 4.5 0 0 1-4.5 4.5H7A4.5 4.5 0 0 1 2.5 17V7A4.5 4.5 0 0 1 7 2.5Zm0 1.8A2.7 2.7 0 0 0 4.3 7v10A2.7 2.7 0 0 0 7 19.7h10a2.7 2.7 0 0 0 2.7-2.7V7A2.7 2.7 0 0 0 17 4.3H7Zm10.8 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7.4A4.6 4.6 0 1 1 7.4 12 4.61 4.61 0 0 1 12 7.4Zm0 1.8A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Z",
  },
  facebook: {
    label: "Facebook",
    path: "M13.35 21.5v-7.8h2.62l.4-3.03h-3.02V8.73c0-.88.24-1.48 1.5-1.48h1.6V4.54c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05v2.2H7.5v3.03h2.65v7.8h3.2Z",
  },
  tiktok: {
    label: "TikTok",
    path: "M14.5 3c.28 2.26 1.55 3.77 3.8 4.05v2.46a6.7 6.7 0 0 1-3.72-1.15v5.28a5.6 5.6 0 1 1-5.6-5.6c.37 0 .73.04 1.08.1v2.66a2.92 2.92 0 1 0 1.84 2.74V3h2.6Z",
  },
  pinterest: {
    label: "Pinterest",
    path: "M12 2.5a9.5 9.5 0 0 0-3.46 18.35c-.05-1.56 0-3.43.42-5.08l1.16-4.93s-.29-.59-.29-1.46c0-1.37.8-2.4 1.8-2.4.84 0 1.25.63 1.25 1.39 0 .84-.53 2.1-.8 3.27-.23.98.49 1.78 1.45 1.78 1.74 0 2.91-2.23 2.91-4.87 0-2.01-1.35-3.52-3.8-3.52a4.31 4.31 0 0 0-4.47 4.36c0 .8.24 1.36.62 1.79.17.2.2.28.14.5l-.23.92c-.08.31-.32.42-.59.3-1.64-.67-2.4-2.48-2.4-4.5 0-3.35 2.81-7.36 8.42-7.36 4.51 0 7.48 3.27 7.48 6.78 0 4.64-2.58 8.1-6.38 8.1-1.28 0-2.48-.68-2.89-1.45l-.78 2.98c-.28 1.08-.84 2.43-1.36 3.38A9.5 9.5 0 1 0 12 2.5Z",
  },
  youtube: {
    label: "YouTube",
    path: "M21.2 7.2a3 3 0 0 0-2.1-2.12C17.23 4.5 12 4.5 12 4.5s-5.23 0-7.1.58A3 3 0 0 0 2.8 7.2 31.32 31.32 0 0 0 2.5 12a31.32 31.32 0 0 0 .3 4.8 3 3 0 0 0 2.1 2.12c1.87.58 7.1.58 7.1.58s5.23 0 7.1-.58a3 3 0 0 0 2.1-2.12 31.32 31.32 0 0 0 .3-4.8 31.32 31.32 0 0 0-.3-4.8ZM10.1 15.98V8.02L16.35 12l-6.25 3.98Z",
  },
  x: {
    label: "X",
    path: "M18.9 3.5h2.78l-6.08 6.95 7.15 10.05h-5.6l-4.39-6.1-5.34 6.1H4.64l6.5-7.43L4.3 3.5h5.74l3.97 5.57L18.9 3.5Zm-.98 15.32h1.54L9.18 5.1H7.52l10.4 13.72Z",
  },
};

function sanitizeNavigation(items?: SiteNavigationItem[]) {
  return (
    items?.filter((item) => {
      const label = item?.label?.trim()
      const href = item?.href?.trim()

      if (!label || !href) return false
      if (!href.startsWith('/') || href.startsWith('//')) return false

      return true
    }) ?? []
  )
}

function sanitizeSocialLinks(items?: SiteSocialLink[]) {
  return items?.filter((item) => item?.url && item?.platform && supportedSocialIcons[item.platform]) ?? [];
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navigation = fallbackNavigation;
  let socialLinks: SiteSocialLink[] = [];

  try {
    const siteSettings = await getSiteSettings();
    const configuredNavigation = sanitizeNavigation(siteSettings?.navigationItems);
    const configuredSocialLinks = sanitizeSocialLinks(siteSettings?.socialLinks);

    if (configuredNavigation.length > 0) {
      navigation = configuredNavigation;
    }

    socialLinks = configuredSocialLinks;
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
  }

  return (
    <html lang="en">
      <body>
        <div className="site-wrapper">
          <SiteHeader navigation={navigation} />

          <div className="container content">{children}</div>

          <footer className="site-footer">
            <div className="container site-footer-inner">
              <p>© {new Date().getFullYear()} Mad Made Photography. All rights reserved.</p>
              {socialLinks.length > 0 ? (
                <nav className="social-links" aria-label="Social media">
                  {socialLinks.map((link) => {
                    const icon = supportedSocialIcons[link.platform];

                    return (
                      <a
                        key={`${link.platform}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={icon.label}
                        className="social-link"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="social-icon">
                          <path d={icon.path} fill="currentColor" />
                        </svg>
                      </a>
                    );
                  })}
                </nav>
              ) : null}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}