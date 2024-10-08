"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TailwindEditor from "@/components/editor/TailwindEditor";
import { Loader } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().min(3, "Name should be atleast 3 character"),
  description: z.string().max(200, "Character limit reached of 200"),
  publishedAt: z.date(),
  file: z
    .any()
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 2MB.`,
    })
    .optional(),
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditBlog = ({ blogId }: { blogId: string }) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const [isPending, startTransition] = useTransition();
  const [bodyContent, setBodyContent] = useState<string>("{}");
  const { data, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const res = await axios.get(`/api/blog/${blogId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs", user] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      publishedAt: new Date(),
      file: null,
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        body: data.body,
        publishedAt: formatDate(data.publishedAt),
        image: data.image,
      });
      setBodyContent(data.body);
    }
  }, [data, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("file", values?.file?.[0] || "");
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("body", bodyContent);
        formData.append("publishedAt", values.publishedAt.toString());
        if (typeof values.file === "string") {
          formData.append("image", data.image);
        }
        const res = await axios.patch(`/api/blog/${blogId}`, formData);
        if (res.data._id) {
          queryClient.invalidateQueries({ queryKey: ["blogs"] });
          toast.success("Blog has been published successfully");
        }
      } catch (error) {
        console.log("something went wrong", error);
        toast.error("Oops! Something went wrong");
      }
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* @ts-expect-error it works */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-col gap-4">
          <Input
            {...register("title")}
            required
            placeholder="Title of your blog"
          />
          {form.formState.errors.title && (
            <p className="text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Input
            {...register("description")}
            required
            placeholder="Description of your blog"
          />
          {form.formState.errors.description && (
            <p className="text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
        {!isLoading && bodyContent !== "{}" && (
          <TailwindEditor
            setValue={setBodyContent}
            defaultValue={JSON.parse(bodyContent || "{}")}
          />
        )}

        <div className="flex flex-col gap-4">
          <Input
            {...register("publishedAt")}
            required
            type="date"
            id="publishedAt"
          />
          {form.formState.errors.publishedAt && (
            <p className="text-red-500">
              {form.formState.errors.publishedAt.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Input {...register("file")} type="file" />
          {form.formState.errors.publishedAt && (
            <p className="text-red-500">
              {form.formState.errors.publishedAt.message}
            </p>
          )}
        </div>
        {data?.image && (
          <Image
            src={data.image}
            alt={data.title}
            width={165}
            height={122}
            className="object-cover"
          />
        )}

        <Button
          disabled={
            isPending || form.formState.isSubmitting || form.formState.isDirty
          }
          type="submit"
          className="w-full bg-[#6C5DD3] text-white"
        >
          {isPending && <Loader className="w-5 h-5 animate-spin mr-1.5" />}
          Publish
        </Button>
      </form>
    </div>
  );
};

export default EditBlog;
