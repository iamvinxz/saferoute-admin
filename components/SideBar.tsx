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

const SideBar = () => {
  const [isSidebarExtended, setIsSideBarExtended] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const navItems = NavItems();
  const toggleSideBar = () => {
    setIsSideBarExtended(!isSidebarExtended);
  };

  useEffect(() => {
    setHasMounted(true);
    const savedState = localStorage.getItem("sidebar-extended");
    if (savedState !== null) {
      setIsSideBarExtended(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem(
        "sidebar-extended",
        JSON.stringify(isSidebarExtended),
      );
    }
  }, [isSidebarExtended, hasMounted]);

  return (
    <section
      className={cn(
        isSidebarExtended ? `w-85` : `w-30`,
        `bg-[#536f8188] transition-all duration-300 drop-shadow-xl`,
      )}
    >
      <button className="cursor-pointer ml-8 mt-8 " onClick={toggleSideBar}>
        <Menu size={27} />
      </button>
      <aside
        className={cn(
          !isSidebarExtended && `gap-13 items-center justify-center`,
          `flex flex-col mt-17 transition-all duration-300 gap-10`,
        )}
      >
        {isSidebarExtended && hasMounted
          ? navItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <div
                  className={cn(
                    `flex items-center gap-2 mx-3 p-3 text-[#171717] hover:bg-[#30303042] hover:text-white rounded-xl`,
                    item.active && `bg-[#30303042] text-white`,
                  )}
                >
                  <div>{item.icon}</div>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))
          : navItems.map((item, index) => (
              <TooltipProvider key={index} delayDuration={70}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        `flex items-center justify-center p-7 hover:bg-[#30303042] hover:text-white rounded-xl transition-all w-12 h-12`,
                        item.active && `bg-[#30303042] text-white`,
                      )}
                    >
                      <div>
                        <div>{item.icon}</div>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    sideOffset={10}
                    className="px-3 py-1.5 text-md z-1"
                  >
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
