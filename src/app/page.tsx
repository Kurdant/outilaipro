import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { wisp } from "@/lib/wisp";

const Page = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, page });
  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <div className="prose dark:prose-invert max-w-none my-10">
        <h1 className="text-3xl font-bold mt-10 mb-5">Comprendre l’IA, le web et les nouvelles technologies, simplement.</h1>

        <p className="text-lg text-black-600">Outil IA Pro est un site qui propose des articles sur l’intelligence artificielle, le web et les nouvelles technologies, avec une idée simple : rendre ces sujets compréhensibles et réellement utiles.</p>

        <p className="text-lg text-black-600">Chaque article cherche à expliquer les concepts sans jargon inutile, à mettre en lumière les enjeux concrets et à montrer comment ces technologies peuvent être utilisées dans la vraie vie.</p>

      </div>
      <BlogPostsPreview posts={result.posts} />
      <BlogPostsPagination pagination={result.pagination} />
      <Footer />
    </div>
  );
};

export default Page;
