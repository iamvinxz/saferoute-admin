import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import { getDepthColors, getStatusColors } from "@/lib/colorHelper";
import { Fragment, useState } from "react";
import ReportDetails from "./ReportDetails";
import { useDispatch } from "react-redux";
import { setSosReport } from "@/state/slices/sosSignalReportSlice";

interface SosSignalProps {
  activeTab: string;
  search: string;
  sortBy: string;
  filterValue: string;
}

const SOSsignalTable = ({
  search,
  activeTab,
  sortBy,
  filterValue,
}: SosSignalProps) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  //rtk
  const { data: sosAlertsResponse, isLoading: alertsLoading } =
    useGetAllSosAlertQuery();

  //handlers
  const filteredSosSignals = sosAlertsResponse?.alerts.filter((alert) => {
    const matchesSearch =
      alert.streetName.toLowerCase().includes(search.toLowerCase()) ||
      alert.condition.toLowerCase().includes(search.toLowerCase()) ||
      alert.status.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterValue === "all" ||
      (sortBy === "status"
        ? alert.status.toLowerCase() === filterValue
        : alert.condition.toLowerCase() === filterValue);

    return matchesSearch && matchesFilter;
  });

  return (
    <Fragment>
      <div className="bg-white border border-slate-100 rounded-md shadow-sm max-lg:hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                No.
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Street name
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Number of Person
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
            {alertsLoading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="px-5 py-4">
                    <div className="animate-pulse-fast h-4 w-4 bg-slate-200 rounded" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="animate-pulse-fast h-4 w-full bg-slate-200 rounded-md" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="animate-pulse-fast h-4 w-20 bg-slate-200 rounded-md" />
                  </td>
                </tr>
              ))
            ) : filteredSosSignals?.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-8 text-center text-sm text-[#848484]"
                >
                  No reports found.
                </td>
              </tr>
            ) : (
              filteredSosSignals?.map((alert, index) => (
                <tr
                  key={alert._id}
                  className="hover:bg-[#f1f5f9]"
                  onClick={() => {
                    dispatch(
                      setSosReport({
                        _id: alert._id,
                        phone: alert._id,
                        streetName: alert.streetName,
                        condition: alert.condition,
                        numberOfPerson: alert.numberOfPersons,
                        status: alert.status,
                        requestedDate: alert.createdAt,
                        coordinates: [
                          alert.coords.latitude,
                          alert.coords.longitude,
                        ],
                        rescuerId: alert.rescuerId?._id ?? null,
                      }),
                    );
                    setShowModal(true);
                  }}
                >
                  <td className="px-5 py-4 text-[#585858]">{index + 1}</td>
                  <td className="px-5 py-4 text-[#585858]">{alert._id}</td>
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
        <ReportDetails activeTab={activeTab} setShowModal={setShowModal} />
      )}

      {/**mobile */}
      <div className="lg:hidden divide-y divide-slate-100">
        {alertsLoading ? (
          [...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start gap-3 py-3">
              <div className="shrink-0 w-10 h-10 bg-slate-200 rounded-full animate-pulse-fast" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-28 bg-slate-200 rounded animate-pulse-fast" />
                    <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse-fast" />
                  </div>
                  <div className="h-4 w-16 bg-slate-200 rounded-full animate-pulse-fast" />
                </div>
                <div className="h-2.5 w-32 bg-slate-200 rounded animate-pulse-fast mb-2" />
                <div className="h-2 w-20 bg-slate-200 rounded animate-pulse-fast" />
              </div>
            </div>
          ))
        ) : filteredSosSignals?.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-[#848484]">
            No SOS signals found.
          </p>
        ) : (
          filteredSosSignals?.map((alert) => {
            const statusColor =
              alert.status.toLowerCase() === "pending"
                ? "bg-amber-400"
                : alert.status.toLowerCase() === "dispatched"
                  ? "bg-blue-500"
                  : alert.status.toLowerCase() === "resolved"
                    ? "bg-green-500"
                    : "bg-red-500";

            return (
              <div
                key={alert._id}
                className="flex items-start gap-3 py-3 active:bg-slate-50"
                onClick={() => {
                  dispatch(
                    setSosReport({
                      _id: alert._id,
                      phone: alert._id,
                      streetName: alert.streetName,
                      condition: alert.condition,
                      numberOfPerson: alert.numberOfPersons,
                      status: alert.status,
                      requestedDate: alert.createdAt,
                      coordinates: [
                        alert.coords.latitude,
                        alert.coords.longitude,
                      ],
                      rescuerId: alert.rescuerId?._id ?? null,
                    }),
                  );
                  setShowModal(true);
                }}
              >
                {/** sos circle pang fill ng space*/}
                <div className="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-500 text-xs font-semibold">
                    SOS
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <p className="text-[#303030] font-medium text-xs truncate">
                        {alert._id}
                      </p>
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${statusColor}`}
                        title={alert.status}
                      />
                    </div>
                    <span
                      className={`inline-flex items-center tracking-wide px-1.5 py-0.5 rounded-full text-[0.65rem] capitalize shrink-0
                  ${getDepthColors(alert.condition).badge}
                  ${getDepthColors(alert.condition).text}`}
                    >
                      {alert.condition}
                    </span>
                  </div>

                  <p className="text-[#707070] text-[10px] line-clamp-1 mb-1">
                    {alert.streetName} · {alert.numberOfPersons} person
                    {alert.numberOfPersons !== 1 ? "s" : ""} in need
                  </p>

                  <p className="text-[#848484] text-[9px]">
                    {new Date(alert.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Fragment>
  );
};

export default SOSsignalTable;
