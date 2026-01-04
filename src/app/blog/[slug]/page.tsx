import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BlogPosting, WithContext } from "schema-dts";


import { BlogPostContent } from "@/components/BlogPostContent";
import { CommentSection } from "@/components/CommentSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RelatedPosts } from "@/components/RelatedPosts";

import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { wisp } from "@/lib/wisp";

interface Params {
  slug: string;
}

export async function generateMetadata(
  props: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await props.params;

  const result = await wisp.getPost(slug);
  if (!result?.post) {
    return { title: "Article introuvable" };
  }

  const { title, image, publishedAt, updatedAt, author } = result.post;

  // description est string | null chez toi, donc on force un string
  const description =
    result.post.description ?? `Actualités IA et tech sur ${config.siteName}.`;

  const canonical = `${config.siteUrl}/blog/${slug}`;
  const generatedOg = signOgImageUrl({ title, brand: config.siteName });

  const ogImages = [
    { url: generatedOg },
    ...(image ? [{ url: image }] : []),
  ];

  return {
    title,
    description,
    alternates: { canonical },

    openGraph: {
      type: "article",
      url: canonical,
      siteName: config.siteName,
      title,
      description,
      images: ogImages,
      publishedTime: publishedAt ? new Date(publishedAt).toISOString() : undefined,
      modifiedTime: updatedAt ? new Date(updatedAt).toISOString() : undefined,
      authors: author?.name ? [author.name] : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((i) => i.url),
    },
  };
}

export default async function Page(props: { params: Promise<Params> }) {
  const { slug } = await props.params;

  const result = await wisp.getPost(slug);
  if (!result?.post) return notFound();

  const { posts } = await wisp.getRelatedPosts({ slug, limit: 3 });

  const { title, image, publishedAt, updatedAt, author } = result.post;

  const description =
    result.post.description ?? `Actualités IA et tech sur ${config.siteName}.`;

  const canonical = `${config.siteUrl}/blog/${slug}`;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: canonical,
    headline: title,
    description,
    image: image ?? undefined,
    datePublished: publishedAt ? new Date(publishedAt).toISOString() : undefined,
    dateModified: updatedAt ? new Date(updatedAt).toISOString() : undefined,
    author: {
      "@type": "Person",
      name: author?.name ?? undefined,
      image: author?.image ?? undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-5">
        <Header />
        <div className="max-w-prose mx-auto text-xl">
          <BlogPostContent post={result.post} />
          <RelatedPosts posts={posts} />
          <CommentSection slug={slug} />
        </div>
        <Footer />
      </div>
    </>
  );
}
