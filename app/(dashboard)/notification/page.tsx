"use client";
import FloodReports from "@/components/notification/FloodReports";
import SOSsignal from "@/components/notification/SOSsignal";
import { useState } from "react";
import ReportDetails from "../../../components/notification/ReportDetails";
import { FloodReport } from "@/state/slices/segment";

const Notification = () => {
  const [activeTab, setActiveTab] = useState<"flood" | "sos">("flood");
  const [selectedReport, setSelectedReport] = useState<FloodReport | null>(
    null,
  );

  return (
    <>
      <div className="ml-20 pt-10">
        <div className="flex gap-5">
          {/* Flood Reports Tab */}
          <div
            onClick={() => setActiveTab("flood")}
            className={`pt-3 pb-2 px-5 rounded-tl-md rounded-tr-md cursor-pointer ${
              activeTab === "flood"
                ? "bg-[#f3f3f3] relative z-10"
                : "bg-[#f3f3f3] opacity-60"
            }`}
          >
            Flood Reports
          </div>

          {/* SOS Signal Tab */}
          <div
            onClick={() => setActiveTab("sos")}
            className={`pt-3 px-5 rounded-tl-md rounded-tr-md cursor-pointer ${
              activeTab === "sos"
                ? "bg-[#f3f3f3] relative z-10"
                : "bg-[#f3f3f3] opacity-60"
            }`}
          >
            SOS Signal
          </div>
        </div>

        {/* Content Box */}
        <div
          className={`mr-20 pt-4 pb-4 px-5 rounded-br-md rounded-bl-md shadow-sm max-h-180 overflow-auto ${
            activeTab === "flood"
              ? "bg-[#f3f3f3] rounded-tr-md"
              : "bg-[#f3f3f3] rounded-tl-md"
          }`}
        >
          {activeTab === "flood" ? (
            <div>
              <FloodReports onSelect={(report) => setSelectedReport(report)} />
            </div>
          ) : (
            <div>
              <SOSsignal />
            </div>
          )}
        </div>
      </div>
      {selectedReport && (
        <ReportDetails
          streetName={selectedReport.streetName}
          depth={selectedReport.depth}
          description={selectedReport.description}
        />
      )}
    </>
  );
};

export default Notification;
