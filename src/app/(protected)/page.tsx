"use client";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { useBlogContext } from "@/contexts/BlogContext";

export default function Home() {
  const { blogs, queryString } = useBlogContext();
  console.log(
    "blogs",
    blogs,
    blogs?.filter((b) =>
      b.title.toLowerCase().includes(queryString.trim().toLowerCase())
    )
  );
  return (
    <div className="px-4 md:px-8 py-6 bg-[#FAFAFB] flex flex-col gap-6 min-h-screen">
      {/* blogheader */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <div className="flex items-center gap-2">
          <Link
            href="/blog/new"
            className="rounded-xl px-[33px] py-[13px] bg-white btn-shadow text-[#6C5DD3] font-semibold"
          >
            Add new
          </Link>
          <button className="rounded-xl px-[33px] py-[13px] bg-[#6C5DD3] btn-shadow text-white font-semibold">
            Preview
          </button>
        </div>
      </div>
      {/*blogs*/}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs
          ?.filter((b) =>
            b.title.toLowerCase().includes(queryString.trim().toLowerCase())
          )
          ?.map((blog, i) => (
            <BlogCard key={i} {...blog} />
          ))}
      </div>
    </div>
  );
}
