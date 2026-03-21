import { usePathname } from "next/navigation";
import { Home, LucideMapPinned, Bell } from "lucide-react";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();

  const isNavItemActive = (pathname: string, nav: string) => {
    return pathname.includes(nav);
  };
  return [
    {
      name: "Home",
      href: "/",
      icon: <Home />,
      active: pathname === "/",
    },
    {
      name: "Maeps",
      href: "/maps",
      icon: <LucideMapPinned />,
      active: isNavItemActive(pathname, "/maps"),
      position: "top",
    },
    {
      name: "Notification",
      href: "/notification",
      icon: <Bell />,
      active: isNavItemActive(pathname, "/maps"),
      position: "top",
    },
  ];
};

export default NavItems;
