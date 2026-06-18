"use client";
import { useState } from "react";
import FloodReportTable from "@/components/notification/FloodReportTable";
import { Menu, Search, ChevronDown } from "lucide-react";
import SideBar from "@/components/SideBar";
import SOSsignalTable from "@/components/notification/SOSsignalTable";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

type ActiveTab = "floodReport" | "sos";
type SortBy = "status" | "floodDepth";

const filterOptions = {
  status: [
    "all",
    "pending",
    "dispatched",
    "responded",
    "resolved",
    "cancelled",
  ],
  floodDepth: ["all", "ankle-deep", "knee-deep", "chest-deep", "critical"],
};

const floodFilterOptions = {
  status: ["all", "pending", "approved"],
  floodDepth: ["all", "ankle-deep", "knee-deep", "chest-deep", "critical"],
};

const Notification = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isRescuer = user?.role === "rescuer";

  const [activeTab, setActiveTab] = useState<ActiveTab>(
    isRescuer ? "sos" : "floodReport",
  );
  const [search, setSearch] = useState<string>("");
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortBy>("status");
  const [filterValue, setFilterValue] = useState<string>("all");
  const [sortByOpen, setSortByOpen] = useState<boolean>(false);
  const [filterValueOpen, setFilterValueOpen] = useState<boolean>(false);

  const [floodSortBy, setFloodSortBy] = useState<SortBy>("status");
  const [floodFilterValue, setFloodFilterValue] = useState<string>("all");
  const [floodSortByOpen, setFloodSortByOpen] = useState<boolean>(false);
  const [floodFilterValueOpen, setFloodFilterValueOpen] =
    useState<boolean>(false);

  const handleSortByChange = (value: SortBy) => {
    setSortBy(value);
    setFilterValue("all");
    setSortByOpen(false);
  };

  const handleFloodSortByChange = (value: "status" | "floodDepth") => {
    setFloodSortBy(value);
    setFloodFilterValue("all");
    setFloodSortByOpen(false);
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-full px-[9vw] py-[5vh]">
      {/**header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-[#1A5EFD] md:text-lg">
            {isRescuer ? "SOS Reports" : "Notifications"}
          </h1>
          <p className="text-[#848484] text-[10px] lg:text-sm">
            {isRescuer
              ? "Check for updated sos signals"
              : "Check for updated flood reports and sos signals."}
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
            {/* hide flood report tab for rescuer */}
            {!isRescuer && (
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
            )}
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

          <div className="flex gap-3 max-lg:mt-5 max-lg:flex-col lg:items-center">
            {activeTab === "floodReport" && (
              <div className="flex items-center gap-2">
                <span className="text-[#848484] text-xs">Sort by:</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setFloodSortByOpen((prev) => !prev);
                      setFloodFilterValueOpen(false);
                    }}
                    className="flex items-center justify-between gap-2 border border-[#e2e9f0] rounded-md px-3 py-1.5 text-[12px] bg-white text-[#303030] min-w-28 hover:border-[#1A5EFD] transition-colors"
                  >
                    <span className="text-[#303030]">
                      {floodSortBy === "floodDepth" ? "Flood Depth" : "Status"}
                    </span>
                    <ChevronDown size={13} className="text-slate-400" />
                  </button>
                  {floodSortByOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#e2e9f0] rounded-md shadow-md">
                      {(["status", "floodDepth"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleFloodSortByChange(option)}
                          className={`w-full text-left px-3 py-2 text-[12px] hover:bg-slate-50 transition-colors ${
                            floodSortBy === option
                              ? "text-[#1A5EFD] font-medium"
                              : "text-[#303030]"
                          }`}
                        >
                          {option === "floodDepth" ? "Flood Depth" : "Status"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setFloodFilterValueOpen((prev) => !prev);
                      setFloodSortByOpen(false);
                    }}
                    className="flex items-center justify-between gap-2 border border-[#e2e9f0] rounded-md px-3 py-1.5 text-[12px] bg-white text-[#303030] min-w-32 hover:border-[#1A5EFD] transition-colors"
                  >
                    <span className="capitalize text-[#303030]">
                      {floodFilterValue}
                    </span>
                    <ChevronDown size={13} className="text-slate-400" />
                  </button>
                  {floodFilterValueOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#e2e9f0] rounded-md shadow-md">
                      {floodFilterOptions[floodSortBy].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFloodFilterValue(option);
                            setFloodFilterValueOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-[12px] capitalize hover:bg-slate-50 transition-colors ${
                            floodFilterValue === option
                              ? "text-[#1A5EFD] font-medium"
                              : "text-[#303030]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "sos" && (
              <div className="flex items-center gap-2">
                <span className="text-[#848484] text-xs">Sort by:</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSortByOpen((prev) => !prev);
                      setFilterValueOpen(false);
                    }}
                    className="flex items-center justify-between gap-2 border border-[#e2e9f0] rounded-md px-3 py-1.5 text-[12px] bg-white text-[#303030] min-w-28 hover:border-[#1A5EFD] transition-colors"
                  >
                    <span className="capitalize text-[#303030]">
                      {sortBy === "floodDepth" ? "Flood Depth" : sortBy}
                    </span>
                    <ChevronDown size={13} className="text-slate-400" />
                  </button>
                  {sortByOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#e2e9f0] rounded-md shadow-md">
                      {(["status", "floodDepth"] as SortBy[]).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSortByChange(option)}
                          className={`w-full text-left px-3 py-2 text-[12px] capitalize hover:bg-slate-50 transition-colors ${
                            sortBy === option
                              ? "text-[#1A5EFD] font-medium"
                              : "text-[#303030]"
                          }`}
                        >
                          {option === "floodDepth" ? "Flood Depth" : option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setFilterValueOpen((prev) => !prev);
                      setSortByOpen(false);
                    }}
                    className="flex items-center justify-between gap-2 border border-[#e2e9f0] rounded-md px-3 py-1.5 text-[12px] bg-white text-[#303030] min-w-32 hover:border-[#1A5EFD] transition-colors"
                  >
                    <span className="capitalize text-[#303030]">
                      {filterValue}
                    </span>
                    <ChevronDown size={13} className="text-slate-400" />
                  </button>
                  {filterValueOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#e2e9f0] rounded-md shadow-md">
                      {filterOptions[sortBy].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFilterValue(option);
                            setFilterValueOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-[12px] capitalize hover:bg-slate-50 transition-colors ${
                            filterValue === option
                              ? "text-[#1A5EFD] font-medium"
                              : "text-[#303030]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/**search bar */}
            <div className="relative lg:w-70">
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
        </div>

        {/* Content Box */}
        <div className="pt-4 max-h-185 overflow-y-auto">
          {activeTab === "floodReport" ? (
            <FloodReportTable
              search={search}
              activeTab={activeTab}
              sortBy={floodSortBy}
              filterValue={floodFilterValue}
            />
          ) : (
            <SOSsignalTable
              search={search}
              activeTab={activeTab}
              sortBy={sortBy}
              filterValue={filterValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
