import { connectToDB } from "@/dbConfig/connectToDB";
import Blog from "@/models/Blog";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { createBlogSchema } from "@/schemas/blog";
import cloudinary, { UploadApiResponse } from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectToDB();

export async function GET(req: NextRequest) {
  try {
    const data = getDataFromToken(req);
    const blogs = await Blog.find({ author: data.id });
    console.log("blogs", blogs);
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.log("failed to get blogs", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uploadResult: UploadApiResponse | undefined = await new Promise(
        (resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream({}, (error, result) => {
              if (error) {
                reject(error);
              }
              resolve(result);
            })
            .end(buffer);
        }
      );
      if (!uploadResult)
        return NextResponse.json(
          { message: "Something went wrong" },
          { status: 500 }
        );
      formData.append("image", uploadResult?.secure_url);
    }
    const requestBody = {
      title: formData.get("title"),
      body: formData.get("body"),
      publishedAt: formData.get("publishedAt") as string,
      image: formData.get("image"),
      description: formData.get("description"),
    };
    const payload = createBlogSchema.parse({
      ...requestBody,
      publishedAt: new Date(requestBody.publishedAt),
    });
    const data = getDataFromToken(req);
    const blog = await Blog.create({
      ...payload,
      author: data.id,
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.log("failed to create blog", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
