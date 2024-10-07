"use client";
import React from "react";
import { SearchIcon } from "./svgs";
import { useBlogContext } from "../contexts/BlogContext";

const Search = () => {
  const { queryString, setQueryString } = useBlogContext();
  return (
    <div className="flex items-center gap-2 lg:w-[82px]">
      <SearchIcon className="w-5 h-5" />
      <input
        type="text"
        placeholder="Search..."
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
        className="hidden lg:inline-flex w-full bg-transparent outline-none text-sm"
      />
    </div>
  );
};

export default Search;
