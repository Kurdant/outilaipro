"use client";
import { GetPostResult } from "@/lib/wisp";
import Link from "next/link";
import sanitize, { defaults } from "sanitize-html";

export const PostContent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitize(content, {
    allowedTags: [
      "b",
      "br",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "code",
      "pre",
      "p",
      "li",
      "ul",
      "ol",
      "blockquote",
      // tables
      "td",
      "th",
      "table",
      "tr",
      "tbody",
      "thead",
      "tfoot",
      "small",
      "div",
      "iframe",
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      "*": ["style"],
      iframe: ["src", "allowfullscreen", "style"],
      a: ["href", "target", "rel"],
      p: ["align", "style"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
  });
  return (
    <div
      className="blog-content mx-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

export const BlogPostContent = ({ post }: { post: GetPostResult["post"] }) => {
  if (!post) return null;
  const { title, publishedAt, createdAt, content, tags } = post;
  return (
    <div>
      <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
        <h1>{title}</h1>
        <PostContent content={content} />

        <div className="mt-10 opacity-40 text-sm">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="text-primary mr-2"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
        <div className="text-sm opacity-40 mt-4">
          {Intl.DateTimeFormat("en-US").format(
            new Date(publishedAt || createdAt)
          )}
        </div>
      </div>
      <hr />
      <section className="sponsored-content" aria-label="Contenu partenaire">
        <h2 className="sponsored-title">
          <a href="https://kinsta.com/?kaid=XTLUVMYZCYQM" target="_blank" rel="sponsored noopener">
            Hébergement WP infogéré premium
          </a>
        </h2>

        <p className="sponsored-kicker">CONTENU PARTENAIRE</p>

        {/* Option 1: si tu as une image/logo */}
        <img
          className="sponsored-logo"
          src="/images/kinsta-logo.png"
          alt=""
          loading="lazy"
        />
        <p className="sponsored-brand">KINSTA</p>
        <p className="sponsored-tagline">MANAGED WORDPRESS HOSTING</p>

        <span className="sponsored-divider" aria-hidden="true"></span>

        <div className="sponsored-body">
          <p>
            Pour héberger votre projet web ou votre serveur Node.js facilement, cet article contient un lien affilié vers
            Kinsta, un hébergeur rapide, fiable et adapté aux développeurs et entreprises.
          </p>
          <p>
            Cette recommandation est basée sur la performance et la simplicité d’utilisation, afin que vous puissiez vous concentrer sur le développement sans vous soucier de la configuration serveur.
          </p>
          <p className="sponsored-cta">
            <a href="https://kinsta.com/?kaid=XTLUVMYZCYQM" target="_blank" rel="sponsored noopener">
              Voir le site de l’hébergeur
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};
