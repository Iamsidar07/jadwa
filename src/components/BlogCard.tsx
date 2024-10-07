import React, { useTransition } from "react";
import Image from "next/image";
import { Calendar } from "./svgs";
import { Blog } from "@/contexts/BlogContext";
import { Edit, Delete } from "./svgs";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

const BlogCard = (blog: Blog) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await axios.delete(`/api/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  const handleDelete = async ({ id }: { id: string }) => {
    startTransition(async () => {
      toast.promise(mutation.mutateAsync({ id }), {
        loading: "Deleting your blog...",
        success: (data) => {
          console.log("success", data);
          return `Successfully deleted`;
        },
        error: (e) => {
          console.log("error", e);
          return "Something went wrong";
        },
      });
    });
  };
  return (
    <Link href={`/blog/${blog._id}`}>
      <div className="bg-white rounded-lg p-6 btn-shadow flex flex-col gap-3">
        <Image
          src={blog.image}
          alt="blog"
          width={256}
          height={75}
          className="object-contain mx-auto aspect-[160/122]"
        />
        <h3 className="mt-2 text-[#1B1D21] font-medium text-[16px]">
          {blog.title}
        </h3>
        <p className="text-[#9D9DAA] font-normal text-[14px] truncate h-12">
          {blog.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Calendar className="w-4 h-4" />
            <span className="uppercase text-[#9D9DAA] text-xs">
              {new Date(blog.publishedAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <Edit
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                router.push(`/blog/edit/${blog._id}`);
                e.stopPropagation();
              }}
              className="w-5 h-5 cursor-pointer"
            />
            <Delete
              disabled={isPending}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleDelete({ id: blog._id });
                e.stopPropagation();
              }}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
