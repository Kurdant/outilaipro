// src/lib/config.ts
const required = (name: string, value: string | undefined) => {
  if (!value) throw new Error(`${name} is missing`);
  return value;
};

const buildConfig = () => {
  const blogId = required("NEXT_PUBLIC_BLOG_ID", process.env.NEXT_PUBLIC_BLOG_ID);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "OutilAIPro";

  const defaultTitle =
    process.env.NEXT_PUBLIC_DEFAULT_TITLE ||
    "OutilAIPro — Actualités IA, tech & dev";

  const defaultDescription =
    process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION ||
    "Actualités et analyses sur l’IA, les dernières technologies, le code, Linux et le hardware.";

  // TODO: si tu as un compte X/Twitter
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE || "";

  // TODO: une image par défaut (à créer), ex: /og.png
  const defaultOgImage = process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE || "/og.png";

  return {
    siteUrl,
    siteName,
    defaultTitle,
    defaultDescription,
    defaultOgImage,
    twitterHandle,
    wisp: { blogId },
    ogImageSecret: process.env.OG_IMAGE_SECRET || "secret_used_for_signing_and_verifying_the_og_image_url",
  };
};

export const config = buildConfig();
