import {
  useDeleteSosMutation,
  useGetAllSosAlertQuery,
  useGetAllSosByDepthQuery,
  useGetAllSosByStatusQuery,
} from "@/Redux/Services/sosService";
import { getDepthColors, getStatusColors } from "@/lib/colorHelper";
import { Fragment, useState } from "react";
import ReportDetails from "./ReportDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setSosReport } from "@/state/slices/sosSignalReportSlice";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import formatRequestedTime from "@/lib/formatRequestedTime";
import { createPortal } from "react-dom";

interface SosSignalProps {
  activeTab: string;
  search: string;
  sortBy: string;
  filterValue: string;
  page: number;
  onPageChange: (page: number) => void;
}

const SOSsignalTable = ({
  search,
  activeTab,
  sortBy,
  filterValue,
  page,
  onPageChange,
}: SosSignalProps) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  const isFiltering = filterValue !== "all";

  //rtk
  const { data: allAlertsResponse, isLoading: allLoading } =
    useGetAllSosAlertQuery({ page, limit: 10 }, { skip: isFiltering });

  const { data: statusResponse, isLoading: statusLoading } =
    useGetAllSosByStatusQuery(
      { status: filterValue, page, limit: 5 },
      { skip: !isFiltering || sortBy !== "status" },
    );

  const { data: depthResponse, isLoading: depthLoading } =
    useGetAllSosByDepthQuery(
      { depth: filterValue, page, limit: 10 },
      { skip: !isFiltering || sortBy !== "floodDepth" },
    );
  const [deleteSosAlert] = useDeleteSosMutation();

  //var
  const isAdmin = user?.role === "admin";

  const sosAlertsResponse = !isFiltering
    ? allAlertsResponse
    : sortBy === "status"
      ? statusResponse
      : depthResponse;

  const alertsLoading = !isFiltering
    ? allLoading
    : sortBy === "status"
      ? statusLoading
      : depthLoading;

  //handlers
  const filteredSosSignals = sosAlertsResponse?.alerts.filter(
    (alert) =>
      alert.streetName.toLowerCase().includes(search.toLowerCase()) ||
      alert.condition.toLowerCase().includes(search.toLowerCase()) ||
      alert.status.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteSos = async (id: string) => {
    try {
      await deleteSosAlert({ id }).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmDeleteId(null);
    }
  };

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
                Flood Depth
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
              {isAdmin && (
                <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Action
                </th>
              )}
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
                  colSpan={isAdmin ? 8 : 7}
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
                        phone: alert.userId?.phone ?? null,
                        streetName: alert.streetName,
                        condition: alert.condition,
                        numberOfPerson: alert.numberOfPersons,
                        status: alert.status,
                        requestedDate: alert.createdAt,
                        resolvedAt: alert.resolvedAt ?? null,
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
                  <td className="px-5 py-4 text-[#585858]">
                    {(page - 1) * (sosAlertsResponse?.pagination.limit ?? 10) +
                      index +
                      1}
                  </td>
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
                    {formatRequestedTime(alert.createdAt)}
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-4 text-[#fa4242]">
                      <button
                        className="inline-flex items-center px-3 py-1 rounded-md text-[0.72rem] font-medium bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(alert._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
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
                  : alert.status.toLowerCase() === "responded"
                    ? "bg-teal-400"
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
                      phone: alert.userId?.phone ?? null,
                      streetName: alert.streetName,
                      condition: alert.condition,
                      numberOfPerson: alert.numberOfPersons,
                      status: alert.status,
                      requestedDate: alert.createdAt,
                      resolvedAt: alert.resolvedAt ?? null,
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
                        {alert.userId?.phone ?? null}
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
                    {formatRequestedTime(alert.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Pagination */}
      {(() => {
        const pagination = sosAlertsResponse?.pagination;
        if (!pagination || pagination.totalPages <= 1) return null;
        return (
          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-xs text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={!pagination.hasPrevPage}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={!pagination.hasNextPage}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })()}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4"
            onClick={(e) =>
              e.target === e.currentTarget && setConfirmDeleteId(null)
            }
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <h2 className="text-base font-semibold text-[#303030] mb-1">
                Confirm Delete
              </h2>
              <p className="text-xs text-[#848484] mb-6">
                Are you sure you want to delete this SOS alert? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteSos(confirmDeleteId)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </Fragment>
  );
};

export default SOSsignalTable;
