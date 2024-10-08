"use client";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { Logout as LogoutIcon } from "./svgs";

const Logout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteLoggedInSearchParams = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("loggedIn");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  const { mutate: handleLogout } = useMutation({
    mutationFn: async () => await fetch("/api/user/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      deleteLoggedInSearchParams();
      router.push("/login");
    },
  });

  return (
    <div
      onClick={() => handleLogout()}
      className="flex items-center gap-2 text-[#9D9DAA] text-[16px] font-medium px-3 py-2 cursor-pointer"
    >
      <LogoutIcon className="w-6 h-6" />
      <span className="hidden lg:block">Logout</span>
    </div>
  );
};

export default Logout;
