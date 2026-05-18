"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addSegment, updateFloodReport } from "@/state/slices/segment";
import { Navigation, X, Trash2 } from "lucide-react";
import { toggleIsRouting } from "@/state/slices/modeSlice";
import { RootState } from "@/state/store";
import { clearReport } from "@/state/slices/selectedReport";
import dynamic from "next/dynamic";
import { useDeleteFloodReportMutation } from "@/Redux/Services/floodReportService";
import { getDepthColors, getStatusColors } from "@/lib/colorHelper";
import { clearSosReport } from "@/state/slices/sosSignalReportSlice";

interface ReportDetailsProps {
  activeTab: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapOverview = dynamic(
  () => import("@/components/notification/mapOverview"),
  { ssr: false },
);

const ReportDetails = ({ setShowModal, activeTab }: ReportDetailsProps) => {
  const dispatch = useDispatch();
  const isRouting = useSelector((state: RootState) => state.mode.isRouting);
  const router = useRouter();
  const report = useSelector((state: RootState) => state.report);
  const segments = useSelector((state: RootState) => state.segment.segments);
  const sosReport = useSelector((state: RootState) => state.sosReport);

  const [deleteFloodReport] = useDeleteFloodReportMutation();

  const handleDeleteFloodReport = async (id: string) => {
    try {
      await deleteFloodReport({ id });
      dispatch(clearReport());
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSegment = () => {
    dispatch(addSegment());
    const lastIndex = segments.length;
    dispatch(
      updateFloodReport({
        index: lastIndex,
        field: "streetName",
        value: report.streetName,
      }),
    );
    dispatch(
      updateFloodReport({
        index: lastIndex,
        field: "depth",
        value: report.depth,
      }),
    );
    dispatch(
      updateFloodReport({
        index: lastIndex,
        field: "description",
        value: report.description,
      }),
    );
    if (!isRouting) dispatch(toggleIsRouting());
    router.push("/maps");
    dispatch(clearReport());
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 w-full max-w-lg">
        {activeTab === "floodReport" ? (
          <div>
            {/**flood report */}
            {/* Header */}
            <div className="flex justify-between items-start border-b border-[#e6e6e6] pb-2 mb-2">
              <div>
                <p className="font-medium text-[#303030]">
                  Flood Report Details.
                </p>
                <p className="text-xs text-[#848484]">
                  Resident's report update of the flood level on their area.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  dispatch(clearReport());
                }}
              >
                <X size={10} className="hover:cursor-pointer" />
              </button>
            </div>

            {/* Image */}
            <div className="w-full flex justify-center mt-4">
              {report.imageUrl && (
                <div className="relative w-full max-w-md aspect-video rounded-md overflow-hidden border shadow">
                  <Image
                    src={report.imageUrl}
                    alt="Report image"
                    fill
                    className="object-fill"
                  />
                </div>
              )}
            </div>

            {/* Fields */}
            <div className="mt-5 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <p className="text-[10px] text-[#848484] mb-1">Street name</p>
                  <p className="text-sm font-medium text-[#303030] truncate">
                    {report.streetName}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2">
                  <p className="text-[10px] text-[#848484] mb-1">Condition</p>
                  <span
                    className={`inline-flex items-center tracking-wide px-1 py-0.5 rounded-lg text-[0.62rem] capitalize
                      ${getDepthColors(report.depth).badge}
                      ${getDepthColors(report.depth).text}`}
                  >
                    {report.depth}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md px-3 py-2.5">
                <p className="text-[10px] text-[#848484] mb-1">Reported at</p>
                <p className="text-xs font-medium text-[#303030]">
                  {new Date(report.reportedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="bg-gray-50 rounded-md px-3 py-2.5">
                <p className="text-[10px] text-[#848484] mb-1">Description</p>
                <p className="text-sm text-[#303030] leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* Map */}
              <div className="rounded-md overflow-hidden border border-[#e6e6e6] h-40">
                <MapOverview coordinates={report.coordinates} />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <button
                  onClick={handleCreateSegment}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md bg-[#1A5EFD] text-white text-xs transition-colors hover:cursor-pointer hover:bg-[#5183f8]"
                >
                  <Navigation size={14} /> Create segment
                </button>
                <button
                  onClick={() => {
                    handleDeleteFloodReport(report.id);
                    setShowModal(false);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md bg-white border text-red-400 text-xs hover:bg-[#dfdfdf] hover:cursor-pointer transition-colors"
                >
                  <Trash2 size={14} /> Delete report
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/**sos */}
            {/** header */}
            <div className="flex justify-between items-start border-b border-[#e6e6e6] pb-2 mb-2">
              <div>
                <p className="font-medium text-[#303030]">
                  SOS Signal Report Details
                </p>
                <p className="text-xs text-[#848484]">
                  Resident's sos signal for rescue assistance.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  dispatch(clearSosReport());
                }}
              >
                <X size={10} className="hover:cursor-pointer" />
              </button>
            </div>

            {/**fields */}
            <div className="mt-5 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <p className="text-[10px] text-[#848484] mb-1">
                    Phone number
                  </p>
                  <p className="text-sm font-medium text-[#303030] truncate">
                    {sosReport.phone}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2">
                  <p className="text-[10px] text-[#848484] mb-1">Condition</p>
                  <span
                    className={`inline-flex items-center tracking-wide px-1 py-0.5 rounded-lg text-[0.62rem] capitalize
                      ${getDepthColors(sosReport.condition).badge}
                      ${getDepthColors(sosReport.condition).text}`}
                  >
                    {sosReport.condition}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <p className="text-[10px] text-[#848484] mb-1">Street name</p>
                  <p className="text-sm font-medium text-[#303030] truncate">
                    {sosReport.streetName}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <p className="text-[10px] text-[#848484] mb-1">
                    Number of Persons
                  </p>
                  <p className="text-sm font-medium text-[#303030] truncate">
                    {sosReport.numberOfPerson}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md px-3 py-2">
                <p className="text-[10px] text-[#848484] mb-1">Status</p>
                <span
                  className={`inline-flex items-center tracking-wide px-1 py-1 rounded-lg text-[0.72rem] capitalize
                      ${getStatusColors(sosReport.status.toLowerCase()).badge} 
                      ${getStatusColors(sosReport.status.toLowerCase()).text}`}
                >
                  {sosReport.status}
                </span>
              </div>

              <div className="bg-gray-50 rounded-md px-3 py-2.5">
                <p className="text-[10px] text-[#848484] mb-1">Reported at</p>
                <p className="text-xs font-medium text-[#303030]">
                  {new Date(sosReport.requestedDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    },
                  )}
                </p>
              </div>

              {/* Map */}
              <div className="rounded-md overflow-hidden border border-[#e6e6e6] h-40">
                <MapOverview coordinates={sosReport.coordinates} />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <button
                  onClick={handleCreateSegment}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md bg-[#1A5EFD] text-white text-xs transition-colors hover:cursor-pointer hover:bg-[#5183f8]"
                >
                  <Navigation size={14} /> Response
                </button>
                <button
                  onClick={() => {
                    handleDeleteFloodReport(report.id);
                    setShowModal(false);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md bg-white border text-red-400 text-xs hover:bg-[#dfdfdf] hover:cursor-pointer transition-colors"
                >
                  <Trash2 size={14} /> Disregard report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;
