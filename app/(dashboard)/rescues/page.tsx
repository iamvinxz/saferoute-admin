"use client";
import { useGetMeQuery } from "@/Redux/Services/authService";
import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import { getStatusColors, getDepthColors } from "@/lib/colorHelper";
import { Menu, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import SideBar from "@/components/SideBar";
import { setSosReport } from "@/state/slices/sosSignalReportSlice";
import { useDispatch } from "react-redux";
import ReportDetails from "@/components/notification/ReportDetails";

type SortBy = "status" | "condition";

const RescuesPage = () => {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>("status");
  const [filterValue, setFilterValue] = useState<string>("all");
  const [sortByOpen, setSortByOpen] = useState<boolean>(false);
  const [filterValueOpen, setFilterValueOpen] = useState<boolean>(false);

  //rtk
  const { data: meData } = useGetMeQuery();
  const { data: sosResponse, isLoading } = useGetAllSosAlertQuery({
    limit: 100,
    page: 1,
  });

  const respondedTo = meData?.user?.respondedTo ?? [];

  const filterOptions = {
    status: ["all", "pending", "dispatched", "resolved", "cancelled"],
    condition: ["all", "ankle-deep", "knee-deep", "chest-deep", "critical"],
  };

  const myRescues =
    sosResponse?.alerts?.filter((alert) => respondedTo.includes(alert._id)) ??
    [];

  const filteredRescues = myRescues.filter((alert) => {
    const matchesSearch =
      alert.streetName.toLowerCase().includes(search.toLowerCase()) ||
      alert.userId?.phone?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterValue === "all"
        ? true
        : sortBy === "status"
          ? alert.status.toLowerCase() === filterValue
          : alert.condition.toLowerCase() === filterValue;

    return matchesSearch && matchesFilter;
  });

  const handleSortByChange = (value: SortBy) => {
    setSortBy(value);
    setFilterValue("all");
    setSortByOpen(false);
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-full px-[9vw] py-[5vh]">
      {/* header */}
      <div className="flex justify-between items-center mb-4 lg:mb-8">
        <div>
          <h1 className="font-semibold text-[#1A5EFD] md:text-lg">
            My Rescues
          </h1>
          <p className="text-[#848484] text-[10px] lg:text-sm">
            SOS reports you have responded to.
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

      <div className="flex justify-between gap-5 max-lg:flex-col mb-5">
        <div className="flex items-center gap-2">
          <span className="text-[#848484] text-xs">Sort by:</span>

          {/* Sort By */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSortByOpen((prev) => !prev);
                setFilterValueOpen(false);
              }}
              className="flex items-center justify-between gap-2 border border-[#e2e9f0] rounded-md px-3 py-1.5 text-[12px] bg-white text-[#303030] min-w-28 hover:border-[#1A5EFD] transition-colors"
            >
              <span className="capitalize">{sortBy}</span>
              <ChevronDown size={13} className="text-slate-400" />
            </button>

            {sortByOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-[#e2e9f0] rounded-md shadow-md">
                {(["status", "condition"] as SortBy[]).map((option) => (
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
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setFilterValueOpen((prev) => !prev);
                setSortByOpen(false);
              }}
              className="flex items-center justify-between gap-2 border border-[#e2e9f0] rounded-md px-3 py-1.5 text-[12px] bg-white text-[#303030] min-w-32 hover:border-[#1A5EFD] transition-colors"
            >
              <span className="capitalize">{filterValue}</span>
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

        {/* Search */}
        <div className="relative lg:w-70">
          <Search size={15} className="absolute left-3 top-2" color="#94a3b8" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rescues"
            className="w-full border border-[#e2e9f0] outline-none rounded-md pl-9.5 pr-2 py-1 text-[0.87rem] bg-[#fafbfc] text-[#303030]"
          />
        </div>
      </div>

      {/* table */}
      <div className="bg-white border border-slate-100 rounded-md shadow-sm max-lg:hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                No.
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Phone number
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Street Name
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Number of Persons
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Requested Time
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  {[...Array(6)].map((_, i) => (
                    <td key={i} className="px-5 py-4">
                      <div className="animate-pulse h-4 w-full bg-slate-200 rounded-md" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredRescues?.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-sm text-[#848484]"
                >
                  No rescues found.
                </td>
              </tr>
            ) : (
              filteredRescues?.map((alert, index) => (
                <tr
                  key={alert._id}
                  className="hover:bg-[#f1f5f9]"
                  onClick={() => {
                    dispatch(
                      setSosReport({
                        _id: alert._id,
                        phone: alert.userId?.phone ?? null,
                        streetName: alert.streetName,
                        condition: alert.condition,
                        numberOfPerson: alert.numberOfPersons,
                        status: alert.status,
                        resolvedAt: alert.resolvedAt ?? null,
                        requestedDate: alert.createdAt,
                        coordinates: [
                          alert.coords.latitude,
                          alert.coords.longitude,
                        ],
                        rescuerId: alert.rescuerId?._id ?? null,
                        rescuerName: alert.rescuerId?.name ?? null,
                      }),
                    );
                    setShowModal(true);
                  }}
                >
                  <td className="px-5 py-4 text-[#585858]">{index + 1}</td>
                  <td className="px-5 py-4 text-[#585858]">
                    {alert.userId?.phone}
                  </td>
                  <td className="px-5 py-4 text-[#585858]">
                    {alert.streetName}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center tracking-wide px-1 py-1 rounded-lg text-[0.72rem] capitalize
                      ${getDepthColors(alert.condition).badge}
                      ${getDepthColors(alert.condition).text}`}
                    >
                      {alert.condition}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#585858]">
                    {alert.numberOfPersons}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center tracking-wide px-1 py-1 rounded-lg text-[0.72rem] capitalize
                      ${getStatusColors(alert.status.toLowerCase()).badge}
                      ${getStatusColors(alert.status.toLowerCase()).text}`}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#585858]">
                    {new Date(alert.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ReportDetails activeTab={"sos"} setShowModal={setShowModal} />
      )}

      {/* mobile */}
      <div className="lg:hidden divide-y divide-slate-100">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start gap-3 py-3">
              <div className="shrink-0 w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-28 bg-slate-200 rounded animate-pulse" />
                <div className="h-2.5 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-2 w-20 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : filteredRescues?.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-[#848484]">
            No rescues found.
          </p>
        ) : (
          filteredRescues?.map((alert) => (
            <div key={alert._id} className="flex items-start gap-3 py-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-500 text-xs font-semibold">SOS</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-[#303030] font-medium text-xs truncate">
                    {alert.streetName}
                  </p>
                  <span
                    className={`inline-flex items-center tracking-wide px-1.5 py-0.5 rounded-full text-[0.65rem] capitalize shrink-0
                    ${getDepthColors(alert.condition).badge}
                    ${getDepthColors(alert.condition).text}`}
                  >
                    {alert.condition}
                  </span>
                </div>
                <p className="text-[#707070] text-[10px] mb-1">
                  {alert.numberOfPersons} person
                  {alert.numberOfPersons !== 1 ? "s" : ""} in need
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center tracking-wide px-1.5 py-0.5 rounded-full text-[0.65rem] capitalize
                    ${getStatusColors(alert.status.toLowerCase()).badge}
                    ${getStatusColors(alert.status.toLowerCase()).text}`}
                  >
                    {alert.status}
                  </span>
                  <p className="text-[#848484] text-[9px]">
                    {new Date(alert.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RescuesPage;
