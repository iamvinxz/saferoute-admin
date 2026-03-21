import { usePathname } from "next/navigation";
import { LayoutDashboard, LucideMapPinned, Bell } from "lucide-react";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();

  const isNavItemActive = (pathname: string, nav: string) => {
    return pathname.includes(nav);
  };
  return [
    {
      name: "Dashboard",
      href: "/",
      icon: <LayoutDashboard size={30} />,
      active: pathname === "/",
    },
    {
      name: "Maps",
      href: "/maps",
      icon: <LucideMapPinned size={30} />,
      active: isNavItemActive(pathname, "/maps"),
      position: "top",
    },
    {
      name: "Notification",
      href: "/notification",
      icon: <Bell size={30} />,
      active: isNavItemActive(pathname, "/notification"),
      position: "top",
    },
  ];
};

export default NavItems;
