import Image from "next/image";
import { useDispatch } from "react-redux";
import { setReport } from "@/state/slices/selectedReport";
import { getDepthColors, getStatusColors } from "@/lib/colorHelper";
import { useGetAllFloodReportQuery } from "@/Redux/Services/floodReportService";
import { useState } from "react";
import ReportDetails from "./ReportDetails";
import { createPortal } from "react-dom";

interface FloodReportTableProps {
  search: string;
}

const FloodReportTable = ({ search }: FloodReportTableProps) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  //rtk query
  const { data: floodReportResponse, isLoading: loadingFloodReports } =
    useGetAllFloodReportQuery();

  //handlers
  const filteredFloodReports = floodReportResponse?.reports?.filter(
    (report) =>
      report.streetName.toLowerCase().includes(search.toLowerCase()) || //filter by streetname, status, and flood depth
      report.floodDepth.toLowerCase().includes(search.toLowerCase()) ||
      report.status.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white border border-slate-100 rounded-md shadow-sm">
      {showModal &&
        createPortal(
          <ReportDetails setShowModal={setShowModal} />,
          document.body,
        )}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              No.
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Image
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Street name
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Description
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Flood Depth
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
              Created at
            </th>
          </tr>
        </thead>
        <tbody>
          {loadingFloodReports ? (
            [...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-4 w-4 bg-slate-200 rounded" />
                </td>
                <td className="px-5 py-4">
                  <div className="animate-pulse-fast h-9 w-10 bg-slate-200 rounded-md" />
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
          ) : filteredFloodReports?.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-5 py-8 text-center text-sm text-[#848484]"
              >
                No reports found.
              </td>
            </tr>
          ) : (
            filteredFloodReports?.map((report, index) => (
              <tr
                key={report._id}
                className="hover:bg-[#f1f5f9]"
                onClick={() => {
                  dispatch(
                    setReport({
                      index: index,
                      id: report._id,
                      imageUrl: report.photoUrl,
                      streetName: report.streetName,
                      depth: report.floodDepth,
                      description: report.description,
                      reportedAt: report.createdAt,
                      coordinates: report.coords,
                    }),
                  );
                  setShowModal(true);
                }}
              >
                <td className="px-5 py-4 text-[#585858]">{index + 1}</td>
                <td className="px-5 py-4 text-[#585858]">
                  <Image
                    src={report.photoUrl}
                    alt="image"
                    width={48}
                    height={48}
                    className="object-cover rounded-sm w-15 h-12"
                  />
                </td>
                <td className="px-5 py-4 text-[#585858]">
                  {report.streetName}
                </td>
                <td className="px-5 py-4 text-[#585858]">
                  {report.description}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center tracking-wide px-1 py-1 rounded-lg text-[0.72rem] capitalize
                      ${getDepthColors(report.floodDepth).badge} 
                      ${getDepthColors(report.floodDepth).text}`}
                  >
                    {report.floodDepth}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center tracking-wide px-1 py-1 rounded-lg text-[0.72rem] capitalize
                      ${getStatusColors(report.status.toLowerCase()).badge} 
                      ${getStatusColors(report.status.toLowerCase()).text}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#585858]">
                  {new Date(report.createdAt).toLocaleString("en-US", {
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
  );
};

export default FloodReportTable;
