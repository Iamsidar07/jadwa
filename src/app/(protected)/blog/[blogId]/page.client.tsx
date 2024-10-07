"use client";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Loader } from "lucide-react";
import Image from "next/image";
import TailwindEditor from "@/components/editor/TailwindEditor";

const Blog = ({ blogId }: { blogId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      console.log("querying blog");
      const res = await axios.get(`/api/blog/${blogId}`);
      return res.data;
    },
  });
  return (
    <div className="w-full min-h-screen">
      {isLoading && <Loader className="animate-spin w-4 h-4 m-auto" />}
      {!isLoading && data && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold md:text-5xl">{data?.title}</h1>
          <p>{data?.description}</p>
          <p className="text-[#9D9DAA] text-sm">
            Published at:{" "}
            {new Date(data?.publishedAt).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <Image src={data?.image} alt={data?.title} width={256} height={75} />
          <TailwindEditor
            defaultValue={JSON.parse(data?.body || "{}")}
            isEditable={false}
          />
        </div>
      )}
    </div>
  );
};

export default Blog;
