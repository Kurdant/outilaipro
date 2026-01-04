import type { Metadata } from "next";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";

import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: config.defaultTitle,
    template: `%s | ${config.siteName}`,
  },
  description: config.defaultDescription,
  alternates: {
    canonical: config.siteUrl,
  },
  openGraph: {
    type: "website",
    siteName: config.siteName,
    title: config.defaultTitle,
    description: config.defaultDescription,
    url: config.siteUrl,
    images: [
      {
        url: signOgImageUrl({
          title: config.siteName,
          label: "OutilAIPro",
          brand: config.siteName,
        }),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.defaultTitle,
    description: config.defaultDescription,
    images: [
      signOgImageUrl({
        title: config.siteName,
        label: "OutilAIPro",
        brand: config.siteName,
      }),
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
