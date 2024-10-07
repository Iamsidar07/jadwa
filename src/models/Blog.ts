import mongoose from "mongoose";

interface Blog {
  title: string;
  description: string;
  body: string;
  image: string;
  author: mongoose.Schema.Types.ObjectId;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema<Blog>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
