"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
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
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 2MB.`,
    }),
});

const CreateNewBlog = () => {
  const { user } = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const [bodyContent, setBodyContent] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const res = await axios.postForm("/api/blog", formData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data._id) {
        queryClient.invalidateQueries({ queryKey: ["blogs", user] });
        toast.success("Blog has been published successfully");
        router.push("/");
      }
    },
    onError: (e) => {
      console.log("error", e);
      toast.error("Oops! Something went wrong");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
      title: "",
      description: "",
      publishedAt: new Date(),
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("file", values.file[0]);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("body", bodyContent);
    formData.append("publishedAt", values.publishedAt.toString());
    mutation.mutate({ formData });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* @ts-expect-error Running out of time*/}
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
        <TailwindEditor setValue={setBodyContent} />

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
          <Input {...register("file")} required type="file" />
          {form.formState.errors.publishedAt && (
            <p className="text-red-500">
              {form.formState.errors.publishedAt.message}
            </p>
          )}
        </div>

        <Button
          disabled={
            mutation.isLoading ||
            form.formState.isSubmitting ||
            form.formState.isDirty
          }
          type="submit"
          className="w-full bg-[#6C5DD3] text-white"
        >
          {mutation.isLoading && (
            <Loader className="w-5 h-5 animate-spin mr-1.5" />
          )}
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreateNewBlog;
