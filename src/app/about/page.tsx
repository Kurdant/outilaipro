// src/app/about/page.tsx
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# À propos

# À propos de Outil IA Pro – Votre guide pour comprendre l’IA et les technologies modernes

Outil IA Pro est né d’une idée simple : rendre l’intelligence artificielle, le web et les nouvelles technologies accessibles à tous. Le site propose des articles clairs, pratiques et utiles, pensés pour les développeurs, les entreprises, les créateurs et toute personne curieuse du numérique.

Nous couvrons les sujets les plus récents et pertinents, des tendances IA aux innovations web, en passant par les bonnes pratiques et les outils qui peuvent réellement améliorer la productivité et faciliter le travail quotidien. Chaque article vise à expliquer les concepts de manière compréhensible, sans jargon inutile, tout en donnant des exemples concrets et des conseils exploitables.

Notre objectif est de créer un espace où la technologie devient simple à comprendre, sans perdre sa profondeur. Nous croyons que l’IA et le web ne doivent pas rester réservés aux experts : chacun peut apprendre à les utiliser, à en tirer profit et à anticiper leurs impacts dans le monde professionnel et personnel.

Outil IA Pro se concentre sur la qualité, la clarté et la pertinence de chaque contenu, pour que nos lecteurs repartent avec une vraie compréhension et des outils pratiques pour leur quotidien numérique.

OutilAIPro
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
