// src/app/about/page.tsx
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# À propos

Bienvenue sur **OutilAIPro**, ta source incontournable pour les dernières actualités et analyses sur l’intelligence artificielle, la technologie, le développement, Linux, le software et le hardware.

Notre mission est de te tenir informé des avancées rapides dans le domaine de l’IA et de la tech, tout en fournissant des ressources utiles pour les développeurs et les passionnés de technologie.

Que tu sois un professionnel du secteur, un étudiant ou simplement curieux, OutilAIPro t’offre des articles approfondis, des tutoriels pratiques et des critiques honnêtes pour t’aider à naviguer dans le monde complexe de la technologie moderne.

Merci de nous rejoindre dans cette aventure technologique !

L’équipe OutilAIPro
`;

export async function generateMetadata(): Promise<Metadata> {
  const title = `À propos | ${config.siteName}`;
  const description =
    "Découvre OutilAIPro : actualités IA, tech, code, Linux, software et hardware.";

  const canonical = `${config.siteUrl}/about`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: config.siteName,
      images: [
        {
          url: signOgImageUrl({
            title: config.siteName,
            label: "À propos",
            brand: config.siteName,
          }),
          // (optionnel) width/height si tu veux
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        signOgImageUrl({
          title: config.siteName,
          label: "À propos",
          brand: config.siteName,
        }),
      ],
    },
  };
}

export default async function Page() {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
}
