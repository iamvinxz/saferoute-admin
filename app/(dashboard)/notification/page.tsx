"use client";
import FloodReportCard from "@/components/notification/FloodReportTable";
import SOSsignal from "@/components/notification/SOSsignalTable";
import { useState } from "react";
import ReportDetails from "../../../components/notification/ReportDetails";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import NoContentDisplay from "@/components/notification/NoContentDisplay";
import FloodReportTable from "@/components/notification/FloodReportTable";
import { Search } from "lucide-react";

type ActiveTab = "floodReport" | "sos";

const Notification = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("floodReport");
  const [search, setSearch] = useState<string>("");
  const selectedReport = useSelector((state: RootState) => state.report);

  return (
    <div className="w-full bg-[#f8fafc] h-full lg:px-[9vw] lg:py-[5vh]">
      {/**header */}
      <div className="flex flex-col max-sm:pl-19 justify-center max-sm:ml-0 max-sm:pt-5 ">
        <div>
          <h1 className="text-xl font-semibold text-[#1A5EFD]">
            Notifications
          </h1>
          <p className="text-sm max-sm:text-xs text-[#848484]">
            Manage and create accounts.
          </p>
        </div>
      </div>
      <div className="max-sm:pl-3 mt-5">
        {/**header buttons */}
        <div className="flex justify-between max-sm:w-30 gap-5">
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
          <div className="w-full sm:w-60 relative">
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

        <div className="mr-20 pt-4 max-sm:w-95 max-md:w-123 max-h-185 overflow-auto">
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
