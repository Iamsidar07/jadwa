import { connectToDB } from "@/dbConfig/connectToDB";
import Blog from "@/models/Blog";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { updateBlogSchema } from "@/schemas/blog";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectToDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const _id = params.blogId;
  try {
    const blog = await Blog.findById(_id);
    return NextResponse.json(blog, { status: 200 });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const _id = params.blogId;
  try {
    const data = getDataFromToken(req);
    const blog = await Blog.findById(_id);
    if (!blog)
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    if (blog.author.toString() !== data.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await Blog.findByIdAndDelete(_id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("failed to delete blog", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const _id = params.blogId;
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const requestBody = {
      title: formData.get("title"),
      body: formData.get("body"),
      publishedAt: formData.get("publishedAt") || null,
      image: formData.get("image") || "",
      description: formData.get("description") || "",
    };

    console.log(requestBody);
    let imageUrl = requestBody.image;

    console.log("file", file, typeof file);
    if (file && typeof file === "object") {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({}, (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          })
          .end(buffer);
      });

      imageUrl = (uploadResult as unknown as { secure_url: string }).secure_url;
    }

    const payload = updateBlogSchema.parse({
      ...requestBody,
      image: imageUrl,
      publishedAt: requestBody.publishedAt
        ? new Date(requestBody.publishedAt as string)
        : undefined,
    });

    const data = getDataFromToken(req);

    const existingBlog = await Blog.findById(_id);

    if (!existingBlog || existingBlog.author.toString() !== data.id) {
      return NextResponse.json(
        {
          message: "You are not authorized to update this blog",
        },
        { status: 401 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(_id, payload, {
      new: true,
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.log("Failed to update blog", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
