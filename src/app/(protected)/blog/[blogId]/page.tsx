import Blog from "./page.client";

export default function BlogPage({ params }: { params: { blogId: string } }) {
  const blogId = params.blogId;
  return (
    <div className="px-4 py-8">
      <Blog blogId={blogId} />
    </div>
  );
}
