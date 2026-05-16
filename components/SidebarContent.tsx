import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, MapPinned, Bell, Users, LogOut } from "lucide-react";
import { useLogoutMutation } from "@/Redux/Services/authService";
import { useDispatch } from "react-redux";
import { clearUser } from "@/state/slices/authSlice";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MapPinned, label: "Maps", href: "/maps" },
  { icon: Bell, label: "Notification", href: "/notification" },
  { icon: Users, label: "Users", href: "/users" },
];

const SidebarContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  //rtk query

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-7 py-6">
      {/* logo */}
      <div className="flex items-center gap-2 mb-10 px-2 mt-5">
        <Image
          src="/LOGO.jpg"
          alt="logo"
          width={55}
          height={55}
          className="w-10 h-10 shrink-0"
        />
        <h1 className="font-bold text-[#303030] text-sm xl:text-base shrink">
          Saferoute
        </h1>
      </div>

      {/**for drawer*/}
      <div className="lg:hidden flex gap-3 items-center border-b border-gray-200 pb-2">
        <div className="bg-gray-300 w-12 h-9 rounded-full" />
        <div className="flex items-center justify-between cursor-pointer w-full">
          <div>
            <p className="text-sm">John Doe</p>
            <span className="text-[12px] text-[#848484] relative -top-2">
              Admin
            </span>
          </div>
          <button onClick={handleLogout}>
            <LogOut size={15} color="red" />
          </button>
        </div>
      </div>

      {/* nav */}
      <nav>
        <ul className="flex flex-col gap-5 mt-6">
          {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                    ${
                      isActive
                        ? "text-[#1A5EFD] bg-[#1A5EFD]/10 font-semibold"
                        : "text-[#303030] hover:bg-gray-100"
                    }`}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="shrink">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarContent;
