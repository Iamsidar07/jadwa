import CreateNewBlog from "./page.client";
export default function NewBlog() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-lg md:text-2xl font-medium text-center">
        Create a new blog post
      </h1>
      <CreateNewBlog />
    </div>
  );
}
