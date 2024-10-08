"use client";
import React from "react";
import { Left, Logo, SearchIcon } from "./svgs";
import UserButton from "./UserButton";
import AfterGlowDropdown from "./AfterGlowDropdown";
import Scenario from "./Scenario";
import { useRouter } from "next/navigation";

const MobileHeader = () => {
  const router = useRouter();
  return (
    <div className="px-4 py-2 flex flex-col gap-2 md:hidden">
      <div className="flex items-center justify-between">
        <Left onClick={() => router.back()} className="w-6 h-6" />
        <Logo onClick={() => router.push("/")} className="w-16 h-12" />
        <div className="flex items-center gap-1">
          <SearchIcon className="w-6 h-6" />
          <UserButton />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <AfterGlowDropdown />
        <Scenario />
      </div>
    </div>
  );
};

export default MobileHeader;
