"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavItems from "@/components/NavItems";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLogoutMutation } from "@/Redux/Services/authService";
import { clearUser } from "@/state/slices/authSlice";
import type { AppDispatch } from "@/state/store";

const SideBar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSidebarExtended, setIsSideBarExtended] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const navItems = NavItems();
  const toggleSideBar = () => {
    setIsSideBarExtended(!isSidebarExtended);
  };

  //rtk query
  const [logout] = useLogoutMutation();

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

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <section
      className={cn(
        isSidebarExtended ? `w-85` : `w-30`,
        ` transition-all duration-300 drop-shadow-xl border-r shadow-xl h-full flex flex-col`,
      )}
    >
      <button
        className={cn(
          "cursor-pointer mt-8 mb-4",
          isSidebarExtended ? "ml-8" : "mx-auto",
        )}
        onClick={toggleSideBar}
      >
        <Menu size={27} />
      </button>
      <aside
        className={cn(
          !isSidebarExtended && `gap-13 items-center`,
          `flex flex-col flex-1 mt-17 transition-all duration-300 gap-10`,
        )}
      >
        {isSidebarExtended && hasMounted
          ? navItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <div
                  className={cn(
                    `flex items-center gap-2 mx-3 p-3 text-[#171717] rounded-xl hover:bg-blue-600 hover:text-white `,
                    item.active && `bg-blue-600 text-white shadow-xl`,
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
                        `flex items-center justify-center p-7 hover:bg-blue-600 hover:text-white rounded-xl transition-all w-12 h-12 `,
                        item.active && `bg-blue-600 text-white shadow-xl`,
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

      <div className="mb-8">
        {isSidebarExtended && hasMounted ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mx-3 p-3 w-[calc(100%-24px)] text-[#171717] rounded-xl hover:bg-blue-600 hover:text-white transition-all"
          >
            <LogOut size={30} />
            <span>Logout</span>
          </button>
        ) : (
          <TooltipProvider delayDuration={70}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-3 hover:bg-blue-600 hover:text-white rounded-xl transition-all w-12 h-12 mx-auto"
                >
                  <LogOut size={30} />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={10}
                className="px-3 py-1.5 text-md z-1"
              >
                <span>Logout</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </section>
  );
};

export default SideBar;
