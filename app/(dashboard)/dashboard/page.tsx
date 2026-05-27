"use client";
import StatCard from "@/components/dashboard/Card";
import { useLogoutMutation } from "@/Redux/Services/authService";
import { clearUser } from "@/state/slices/authSlice";
import {
  ChevronDown,
  TriangleAlert,
  Waves,
  Ambulance,
  MapPin,
  GitBranch,
  ShieldUser,
  Users,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import { useGetAllAnnouncementsQuery } from "@/Redux/Services/notificationService";
import Table from "@/components/dashboard/Table";
import { useGetAllArticlesQuery } from "@/Redux/Services/articleService";
import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import { useGetAllFloodReportQuery } from "@/Redux/Services/floodReportService";
import {
  useGetAllPinQuery,
  useGetAllSegmentQuery,
} from "@/Redux/Services/markService";
import {
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
} from "@/Redux/Services/userService";
import { RootState } from "@/state/store";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDown, setIsDown] = useState<boolean>(false);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isRescuer = user?.role === "rescuer";

  //rtk query
  const [logout] = useLogoutMutation();
  const { data: announcementResponse, isLoading: announcementLoading } =
    useGetAllAnnouncementsQuery();
  const { data: articleResponse, isLoading: articleLoading } =
    useGetAllArticlesQuery();
  const { data: sosResponse, isLoading: sosLoading } = useGetAllSosAlertQuery();
  const { data: floodReportResponse, isLoading: floodReportLoading } =
    useGetAllFloodReportQuery();
  const { data: pinnedLocationResponse, isLoading: pinLoading } =
    useGetAllPinQuery();
  const { data: segmentsResponse, isLoading: segmentLoading } =
    useGetAllSegmentQuery();
  const { data: adminUserResponse, isLoading: adminLoading } =
    useGetAllAdminsQuery(undefined, { skip: isRescuer });
  const { data: residentUserResponse, isLoading: residentLoading } =
    useGetAllUsersQuery(undefined, { skip: isRescuer });

  //var
  const announcement = announcementResponse?.announcements;
  const article = articleResponse?.articles;
  const sos = sosResponse?.alerts;
  const floodReport = floodReportResponse?.reports;
  const pin = pinnedLocationResponse?.pins;
  const segment = segmentsResponse?.segments;
  const admins = adminUserResponse?.admins;
  const residents = residentUserResponse?.users;
  const tableLoading = announcementLoading || articleLoading;
  const loading =
    announcementLoading ||
    articleLoading ||
    sosLoading ||
    floodReportLoading ||
    pinLoading ||
    segmentLoading ||
    adminLoading ||
    residentLoading;

  const topCards = isRescuer
    ? [
        {
          count: sos?.filter((s) => s.rescuerId?._id === user?._id).length,
          label: "My Active Rescues",
          desc: "SOS alerts you are currently responding to",
          icon: Ambulance,
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-400",
        },
        {
          count: sos?.filter(
            (s) => s.rescuerId?._id === user?._id && s.status === "resolved",
          ).length,
          label: "Resolved Rescues",
          desc: "People you have successfully rescued",
          icon: TriangleAlert,
          iconBg: "bg-green-100",
          iconColor: "text-green-400",
        },
        {
          count: sos?.filter((s) => s.status === "pending").length,
          label: "Pending SOS",
          desc: "SOS signals waiting for response",
          icon: TriangleAlert,
          iconBg: "bg-red-100",
          iconColor: "text-red-400",
        },
      ]
    : [
        {
          count: sos?.length,
          label: "SOS Signals",
          desc: "Active emergency alerts requiring attention",
          icon: TriangleAlert,
          iconBg: "bg-red-100",
          iconColor: "text-red-400",
        },
        {
          count: floodReport?.length,
          label: "Flood Reports",
          desc: "Incoming flood reports from residents",
          icon: Waves,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-400",
        },
        {
          count: 10,
          label: "Rescued",
          desc: "People successfully rescued by response teams",
          icon: Ambulance,
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-400",
        },
      ];

  const bottomCards = isRescuer
    ? [
        {
          count: pin?.length,
          label: "Pinned Locations",
          desc: "Marked locations on map",
          icon: MapPin,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-400",
        },
        {
          count: segment?.length,
          label: "Segments",
          desc: "Confirmed flooded streets",
          icon: GitBranch,
          iconBg: "bg-red-100",
          iconColor: "text-red-400",
        },
        {
          count: sos?.filter(
            (s) => s.rescuerId?._id === user?._id && s.status === "dispatched",
          ).length,
          label: "Dispatched",
          desc: "Rescues currently in progress",
          icon: Ambulance,
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-400",
        },
        {
          count: sos?.filter(
            (s) => s.rescuerId?._id === user?._id && s.status === "resolved",
          ).length,
          label: "Total Resolved",
          desc: "Total rescues completed",
          icon: ShieldUser,
          iconBg: "bg-green-100",
          iconColor: "text-green-400",
        },
      ]
    : [
        {
          count: pin?.length,
          label: "Pinned Locations",
          desc: "Marked locations on map",
          icon: MapPin,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-400",
        },
        {
          count: segment?.length,
          label: "Segments",
          desc: "Confirmed flooded streets",
          icon: GitBranch,
          iconBg: "bg-red-100",
          iconColor: "text-red-400",
        },
        {
          count: admins?.length,
          label: "Admin Users",
          desc: "Active admin users",
          icon: ShieldUser,
          iconBg: "bg-green-100",
          iconColor: "text-green-400",
        },
        {
          count: residents?.length,
          label: "Residents Users",
          desc: "Active residents users",
          icon: Users,
          iconBg: "bg-green-100",
          iconColor: "text-green-400",
        },
      ];

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
    <div className="overflow-y-auto bg-[#F5F6F9] h-full py-[5vh] px-[9vw]">
      {/* header */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div>
          <p className="text-[12px] text-[#303030]">Welcome, {user?.name}!</p>
          <p className="font-semibold text-[#1A5EFD] md:text-lg">Dashboard</p>
        </div>
        <div className="hidden lg:flex gap-3 pr-10">
          {/* avatar */}
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

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsDown((prev) => !prev)}
          >
            <div>
              <p className="text-sm">{user?.name}</p>
              <span className="text-[12px] text-[#848484] relative -top-2 capitalize">
                {user?.role}
              </span>
            </div>
            <ChevronDown size={15} />
          </div>
        </div>

        {/**menu button for tab and mobile */}
        <div className="lg:hidden">
          <button
            className="text-[#303030]"
            onClick={() => setOpenSideBar(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <SideBar open={openSideBar} setOpen={setOpenSideBar} />
      </div>

      {isDown && (
        <div className="absolute right-38 top-23 w-52 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-2">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 transition-all duration-200 group"
            onClick={handleLogout}
          >
            <div className="bg-red-100 p-2 rounded-lg">
              <LogOut
                size={18}
                className="text-red-500 group-hover:scale-110 transition-transform"
              />
            </div>

            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">Sign out</p>
            </div>
          </button>
        </div>
      )}

      {/* top cards - 3 columns */}
      <div className="grid grid-cols-[200px_200px_200px] overflow-auto gap-5 mb-5 md:grid-cols-3">
        {topCards.map((card) => (
          <StatCard key={card.label} {...card} isLoading={loading} />
        ))}
      </div>

      {/* bottom cards */}
      <div className="grid grid-cols-2 justify-center gap-4 lg:grid-cols-4">
        {bottomCards.map((card) => (
          <StatCard key={card.label} {...card} isLoading={loading} />
        ))}
      </div>

      <Table
        announcement={announcement}
        article={article}
        isLoading={tableLoading}
      />
    </div>
  );
};

export default Dashboard;
