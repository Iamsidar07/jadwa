import React from "react";
import Link from "next/link";
import { Home, Settings, Blogs, Finances, Pitches } from "@/components/svgs";
import Logout from "./Logout";

type Props = {
  icon: React.ReactNode;
  title: string;
};

const NavItem = ({ icon, title }: Props) => (
  <Link
    key={title}
    href="#"
    className={`cursor-pointer flex items-center gap-2 text-[16px] font-medium px-3 py-2 border-l-4 ${
      title === "Blogs"
        ? "border-l-[#6C5DD3] text-[#6C5DD3] rounded-lg"
        : "text-[#9D9DAA] "
    }`}
  >
    {icon}
    <span className="hidden lg:block">{title}</span>
  </Link>
);
const NAVITEMS = [
  {
    title: "Dashboard",
    icon: <Home className="w-6 h-6" />,
  },
  {
    title: "Blogs",
    icon: <Blogs className="w-6 h-6" />,
  },
  {
    title: "Finances",
    icon: <Finances className="w-6 h-6" />,
  },
  {
    title: "Pitches",
    icon: <Pitches className="w-6 h-6" />,
  },
];

const Navbar = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col pt-4 gap-2 flex-1">
        {/* Navbar Items */}
        {NAVITEMS.map((item, i) => (
          <NavItem key={i} icon={item.icon} title={item.title} />
        ))}
      </div>
      <div className="flex flex-col">
        {/* Navbar Items */}
        <NavItem icon={<Settings className="w-6 h-6" />} title="Settings" />
        <Logout />
      </div>
    </div>
  );
};

export default Navbar;
