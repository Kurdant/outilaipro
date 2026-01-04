import type { Metadata } from "next";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Link from "next/link";
import { wisp } from "@/lib/wisp";  

export async function generateMetadata(): Promise<Metadata> {
  const title = `Tags | ${config.siteName}`;
  const description = "Catégories d’articles : IA, tech, code, Linux, software, hardware.";
  const canonical = `${config.siteUrl}/tag`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: config.siteName,
      title,
      description,
      url: canonical,
      images: [
        {
          url: signOgImageUrl({
            title: "Catégories",
            label: "Tags",
            brand: config.siteName,
          }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        signOgImageUrl({
          title: "Catégories",
          label: "Tags",
          brand: config.siteName,
        }),
      ],
    },
  };
}

export default async function Page() {
  const result = await wisp.getTags();

  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="mt-20 mb-12 text-center">
        <h1 className="mb-2 text-5xl font-bold">Tags</h1>
        <p className="text-lg opacity-50">List of all tags</p>
      </div>
      <div className="my-10 max-w-6xl text-balance text-center text-xl mb-48">
        {result.tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tag/${tag.name}`}
            className="text-primary mr-2 inline-block"
          >
            #{tag.name}
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
