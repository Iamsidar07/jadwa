import EditBlog from "./page.client.tsx";
export default function EditBlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blogId = params.blogId;
  return (
    <div className="px-4 py-3">
      <EditBlog blogId={blogId} />
    </div>
  );
}
