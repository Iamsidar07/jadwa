import React from "react";
import { Logo, LogoTablet } from "@/components/svgs";
import UserButton from "./UserButton";
import Search from "./Search";
import AfterGlowDropdown from "./AfterGlowDropdown";
import Scenario from "./Scenario";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center h-full relative">
      <Link
        href="/"
        className="lg:w-[250px] lg:px-4 border-r lg:border-r-0 mr-[55px] lg:mr-0"
      >
        <Logo className="hidden lg:block w-[105px] h-[30px]" />
        <LogoTablet className="w-[105px] h-[30px] absolute left-2 top-1/2 -translate-y-1/2 border-r lg:hidden" />
      </Link>
      <div className="flex flex-1 items-center justify-between px-4">
        <div className="flex gap-2 items-center">
          <AfterGlowDropdown />
          <Scenario />
        </div>
        <div className="flex gap-2 items-center">
          <Search />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
