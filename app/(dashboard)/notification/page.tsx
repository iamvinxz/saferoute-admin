"use client";
import FloodReportCard from "@/components/notification/FloodReportCard";
import SOSsignal from "@/components/notification/SOSsignal";
import { useState } from "react";
import ReportDetails from "../../../components/notification/ReportDetails";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import NoContentDisplay from "@/components/notification/NoContentDisplay";

const Notification = () => {
  const [activeTab, setActiveTab] = useState<"flood" | "sos">("flood");
  const selectedReport = useSelector((state: RootState) => state.report);

  return (
    <>
      <div className=" max-sm:pl-3 pl-20 mt-5 ">
        <div className="flex max-sm:w-30 gap-5">
          {/* Flood Reports Tab */}
          <div
            onClick={() => setActiveTab("flood")}
            className={`pt-3 pb-2 px-5 rounded-tl-md text-white max-sm:text-xs max-md:w-full rounded-tr-md cursor-pointer ${
              activeTab === "flood"
                ? "bg-[#7da3cf] relative z-10"
                : "bg-[#757272] opacity-60"
            }`}
          >
            Flood Reports
          </div>

          {/* SOS Signal Tab */}
          <div
            onClick={() => setActiveTab("sos")}
            className={`pt-3 px-5 rounded-tl-md max-sm:text-xs text-white rounded-tr-md cursor-pointer ${
              activeTab === "sos"
                ? "bg-[#ff7d7d] relative z-10"
                : "bg-[#757272] opacity-60"
            }`}
          >
            SOS Signal
          </div>
        </div>

        {/* Content Box */}

        <div
          className={`mr-20 pt-4 pb-4 px-5 max-sm:w-95 max-md:w-123 rounded-br-md rounded-tr-md  rounded-bl-md shadow-sm h-185 max-h-185 overflow-auto ${
            activeTab === "flood" ? "bg-[#7da3cf] " : "bg-[#ff7d7d] "
          }`}
        >
          {activeTab === "flood" ? (
            <div>
              <FloodReportCard />
            </div>
          ) : (
            <div>
              <SOSsignal />
            </div>
          )}
        </div>
      </div>
      <div className="mr-20 pt-24 max-sm:pt-10 px-5">
        {selectedReport.index !== -1 ? <ReportDetails /> : <NoContentDisplay />}
      </div>
    </>
  );
};

export default Notification;
