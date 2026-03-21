"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavItems from "@/components/NavItems";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SideBarItems {
  name: string;
  href: string;
  icon: any;
  active: boolean;
}

const SideBar = ({ name, href, icon, active }: SideBarItems) => {
  const [isSidebarExtended, setIsSideBarExtended] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const navItems = NavItems();
  const toggleSideBar = () => {
    setIsSideBarExtended(!isSidebarExtended);
  };

  // useEffect(() => {
  //   setHasMounted(true);
  //   const savedState = localStorage.getItem("sidebar-extended");
  //   if (savedState !== null) {
  //     setIsSideBarExtended(JSON.parse(savedState));
  //   }
  // }, []);

  return (
    <section
      className={cn(
        isSidebarExtended ? `w-85` : `w-30`,
        `bg-[#536f8188] transition-all duration-300`,
      )}
    >
      <button className="cursor-pointer ml-8 mt-8 " onClick={toggleSideBar}>
        <Menu size={27} />
      </button>
      <aside className="mt-15">
        {isSidebarExtended
          ? navItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <div className="flex items-center gap-3 p-5 m-3 hover:bg-[#30303042] hover:text-white rounded-xl">
                  <div>{item.icon}</div>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))
          : navItems.map((item, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={item.href}>
                      <div>
                        <div>{item.icon}</div>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <span>{item.name}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
      </aside>

      <div></div>
    </section>
  );
};

export default SideBar;
