"use client";
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import useCurrentUser from "../hooks/useCurrentUser";
import { useQuery } from "react-query";

export interface Blog {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  author: string;
  image: string;
  body: string;
  publishedAt: Date;
  description: string;
}

interface BlogContextStore {
  blogs: Blog[];
  queryString: string;
  setQueryString: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  isError: boolean;
}
const blogContext = createContext<BlogContextStore>({
  blogs: [],
  queryString: "",
  setQueryString: () => {},
  isLoading: false,
  isError: false,
});

const BlogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useCurrentUser();
  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs", user],
    queryFn: async () => {
      const res = await axios.get("/api/blog");
      return res.data;
    },
  });
  const [queryString, setQueryString] = useState<string>("");

  return (
    <blogContext.Provider
      value={{
        blogs,
        queryString,
        setQueryString,
        isLoading,
        isError,
      }}
    >
      {children}
    </blogContext.Provider>
  );
};
export const useBlogContext = () => useContext(blogContext);
export default BlogContextProvider;
