import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  try {
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
    console.log({ url: uploadResult.secure_url });
    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.log("failed to upload", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
