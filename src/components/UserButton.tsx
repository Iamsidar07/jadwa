/* eslint-disable */

"use client";
import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";

const UserButton = () => {
  const { user } = useCurrentUser();
  return (
    <div className="flex items-center gap-2">
      <Image src={user?.profileImageUrl} alt="profile" width={50} height={50} />
      <div className="hidden md:flex flex-col gap-1">
        <p className="text-sm text-[#676E7E] font-medium">{user?.name}</p>
        <p className="text-xs text-[#9D9DAA] font-medium">{user?.role}</p>
      </div>
    </div>
  );
};

export default UserButton;
