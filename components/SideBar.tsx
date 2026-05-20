"use client";
import { usePathname } from "next/navigation";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import SidebarContent from "./SidebarContent";

type SideBarProps = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = ({ open, setOpen }: SideBarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex flex-col min-w-50 w-[16vw] h-screen border-r border-gray-100">
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <Drawer open={open} onOpenChange={setOpen} direction="left">
          <DrawerContent className="h-full max-w-70 rounded-r-2xl rounded-l-none">
            <DrawerHeader className="sr-only">
              <DrawerTitle>Navigation Menu</DrawerTitle>
            </DrawerHeader>
            <SidebarContent />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default SideBar;
