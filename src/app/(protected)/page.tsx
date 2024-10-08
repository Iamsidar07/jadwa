"use client";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { useBlogContext } from "@/contexts/BlogContext";
import { Loader } from "lucide-react";

export default function Home() {
  const { blogs, queryString, isLoading } = useBlogContext();
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
      {isLoading && blogs?.length === 0 ? (
        <Loader className="w-5 h-5 animate-spin mx-auto mt-8" />
      ) : (
        <>
          {blogs.length === 0 && (
            <h2 className="text-center mt-8 text-xl">
              Seems like you have no blogs{" "}
              <Link href="/blog/new" className="text-[#6c5dd3]">
                Let&apos;s create a new blog
              </Link>
            </h2>
          )}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs
              ?.filter((b) =>
                b.title.toLowerCase().includes(queryString.trim().toLowerCase())
              )
              ?.map((blog, i) => (
                <BlogCard key={i} {...blog} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
