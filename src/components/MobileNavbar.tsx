import React from "react";
import { Home, Blogs, Finances, Pitches } from "./svgs";
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
const MobileNavbar = () => {
  return (
    <div className="flex items-center justify-evenly gap-4 md:hidden ">
      {NAVITEMS.map((item) => (
        <div
          key={item.title}
          className={`p-4 ${
            item.title === "Blogs" && "border-b-4 border-b-[#6C5DD3] rounded"
          }`}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default MobileNavbar;
