"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Menu, LogOut, X } from "lucide-react";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const navItems = NavItems();

  const toggleSideBar = () => {
    setIsSideBarExtended(!isSidebarExtended);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  //rtk query
  const [logout] = useLogoutMutation();

  useEffect(() => {
    setHasMounted(true);
    const savedState = localStorage.getItem("sidebar-extended");
    const extended = savedState !== null ? JSON.parse(savedState) : true;
    setIsSideBarExtended(extended);
    document.documentElement.style.setProperty(
      "--sidebar-w",
      extended ? "21.25rem" : "7.5rem",
    );
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem(
        "sidebar-extended",
        JSON.stringify(isSidebarExtended),
      );
      document.documentElement.style.setProperty(
        "--sidebar-w",
        isSidebarExtended ? "21.25rem" : "7.5rem",
      );
    }
  }, [isSidebarExtended, hasMounted]);

  // Close drawer on route change (optional UX improvement)
  useEffect(() => {
    closeDrawer();
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const SidebarContent = ({
    isExpanded,
    onClose,
  }: {
    isExpanded: boolean;
    onClose?: () => void;
  }) => (
    <section
      className={cn(
        isExpanded ? `w-85` : `w-30`,
        `bg-white transition-all duration-300 drop-shadow-xl border-r shadow-xl h-screen flex flex-col`,
      )}
    >
      <div className="flex items-center mt-8 mb-1 px-4">
        <button
          className={cn("cursor-pointer", isExpanded ? "ml-2" : "mx-auto")}
          onClick={onClose ?? toggleSideBar}
        >
          {onClose ? <X size={27} /> : <Menu size={27} />}
        </button>
        {!onClose && isExpanded && (
          <button className="ml-auto cursor-pointer" onClick={toggleSideBar}>
            <Menu size={27} />
          </button>
        )}
      </div>

      <aside
        className={cn(
          !isExpanded && `gap-13 items-center`,
          `flex flex-col flex-1 mt-10 transition-all duration-300 gap-10`,
        )}
      >
        {isExpanded && hasMounted
          ? navItems.map((item, index) => (
              <Link href={item.href} key={index} onClick={onClose}>
                <div
                  className={cn(
                    `flex items-center gap-2 mx-3 p-3 text-[#171717] rounded-xl hover:bg-blue-600 hover:text-white`,
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
                      onClick={onClose}
                      className={cn(
                        `flex items-center justify-center p-7 hover:bg-blue-600 hover:text-white rounded-xl transition-all w-12 h-12`,
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
        {isExpanded && hasMounted ? (
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

  return (
    <>
      {/* Desktop sidebar — visible on md and above */}
      <div className="max-sm:hidden fixed top-0 left-0 z-50">
        <SidebarContent isExpanded={isSidebarExtended} />
      </div>

      {/* Mobile: hamburger button to open drawer */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-xl p-2 shadow-md border"
        onClick={toggleDrawer}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile: backdrop overlay */}
      {isDrawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Mobile: sliding drawer */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 z-50 h-screen transition-transform duration-300 ease-in-out",
          isDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent isExpanded={true} onClose={closeDrawer} />
      </div>
    </>
  );
};

export default SideBar;
