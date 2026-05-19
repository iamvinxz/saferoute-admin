"use client";
import FloodReportCard from "@/components/notification/FloodReportTable";
import SOSsignal from "@/components/notification/SOSsignalTable";
import { useState } from "react";
import ReportDetails from "../../../components/notification/ReportDetails";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import NoContentDisplay from "@/components/notification/NoContentDisplay";
import FloodReportTable from "@/components/notification/FloodReportTable";
import { Menu, Search } from "lucide-react";
import SideBar from "@/components/SideBar";

type ActiveTab = "floodReport" | "sos";

const Notification = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("floodReport");
  const [search, setSearch] = useState<string>("");
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const selectedReport = useSelector((state: RootState) => state.report);

  return (
    <div className="w-full bg-[#f8fafc] h-full px-[9vw] py-[5vh]">
      {/**header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-[#1A5EFD] md:text-lg">
            Notifications
          </h1>
          <p className="text-[#848484] text-[10px] lg:text-sm">
            Check for updated flood reports and sos signals.
          </p>
        </div>
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

      <div className="mt-5">
        {/**header buttons */}
        <div className="lg:flex justify-between gap-5">
          <div className="border-b w-fit">
            <button
              onClick={() => setActiveTab("floodReport")}
              className={`tab-btn text-[12px] transition-colors px-4 py-2.5 md:text-[14px] ${
                activeTab === "floodReport"
                  ? "active text-[#1A5EFD] font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Flood Reports
            </button>
            <button
              onClick={() => setActiveTab("sos")}
              className={`tab-btn text-[12px] transition-colors px-4 py-2.5 md:text-[14px] ${
                activeTab === "sos"
                  ? "active text-[#1A5EFD] font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              SOS Signals
            </button>
          </div>

          {/**search bar */}
          <div className="max-lg:mt-5 relative lg:w-70">
            <Search
              size={15}
              className="absolute left-3 top-2"
              color="#94a3b8"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab === "floodReport" ? "flood reports" : "sos signals"}`}
              className="w-full border border-[#e2e9f0] outline-none rounded-md pl-9.5 pr-2 py-1 text-[0.87rem] bg-[#fafbfc] text-[#303030]"
            />
          </div>
        </div>

        {/* Content Box */}

        <div className="pt-4 max-sm:w-95 max-md:w-123 max-h-185 overflow-auto">
          {activeTab === "floodReport" ? (
            <div>
              <FloodReportTable search={search} activeTab={activeTab} />
            </div>
          ) : (
            <div>
              <SOSsignal search={search} activeTab={activeTab} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
