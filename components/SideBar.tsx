"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";

const SideBar = () => {
  const [isSidebarExtended, setIsSideBarExtended] = useState(true);
  return (
    <section className="w-30 bg-amber-200 h-full">
      <button className="cursor-pointer ml-8 mt-8 ">
        <Menu size={27} />
      </button>

      <div></div>
    </section>
  );
};

export default SideBar;
