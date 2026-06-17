import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  MapPinned,
  Bell,
  Users,
  LogOut,
  ClipboardList,
  BookAlert,
} from "lucide-react";
import { useLogoutMutation } from "@/Redux/Services/authService";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/state/slices/authSlice";
import { RootState } from "@/state/store";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MapPinned, label: "Maps", href: "/maps" },
  { icon: Bell, label: "Notification", href: "/notification" },
  { icon: Users, label: "Users", href: "/users" },
];

const rescuerNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MapPinned, label: "Maps", href: "/maps" },
  { icon: BookAlert, label: "SOS Reports", href: "/notification" },
  { icon: ClipboardList, label: "My Rescues", href: "/rescues" }, // new tab
];

const SidebarContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const navItems = user?.role === "rescuer" ? rescuerNavItems : adminNavItems;

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

  if (!user) {
    return (
      <div className="px-7 py-6">
        <div className="flex items-center gap-2 mb-10 px-2 mt-5">
          <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
          <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-col gap-5 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="px-3 py-2">
              <div className="w-full h-5 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="bg-[#598bff] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-semibold uppercase">
              {user?.name?.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between cursor-pointer w-full">
          <div>
            <p className="text-sm">{user.name}</p>
            <span className="text-[12px] text-[#848484] relative -top-2">
              {user.role}
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
