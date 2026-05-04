import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addSegment, updateFloodReport } from "@/state/slices/segment";
import { MapPin, Droplets, FileText, Navigation } from "lucide-react";
import { toggleIsRouting } from "@/state/slices/modeSlice";
import { RootState } from "@/state/store";
import { trash } from "@/lib/icon";
import { clearReport } from "@/state/slices/selectedReport";
import dynamic from "next/dynamic";
import { useDeleteFloodReportMutation } from "@/Redux/Services/floodReportService";

const depthColors: Record<string, string> = {
  "Ankle-Deep": "text-yellow-600 bg-yellow-50 border-yellow-200",
  "Knee-Deep": "text-orange-600 bg-orange-50 border-orange-200",
  "Chest-Deep": "text-red-600 bg-red-50 border-red-200",
  Critical: "text-red-800 bg-red-100 border-red-300",
};

//disables ssr and force map to render in browser
const MapOverview = dynamic(
  () => import("@/components/notification/mapOverview"),
  {
    ssr: false,
  },
);

const ReportDetails = () => {
  const dispatch = useDispatch();
  const isRouting = useSelector((state: RootState) => state.mode.isRouting);
  const router = useRouter();
  const report = useSelector((state: RootState) => state.report);
  const segments = useSelector((state: RootState) => state.segment.segments);

  //rtk query
  const [deleteFloodReport] = useDeleteFloodReportMutation();

  const handleDeleteFloodReport = async (id: string) => {
    try {
      await deleteFloodReport({ id });
      dispatch(clearReport()); // Clear the selected report after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateSegment = () => {
    dispatch(addSegment());
    const lastIndex = segments.length; //capture last index 
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
    <div className="grid grid-2 gap-4">
      <div>
        <MapOverview />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">
        {/* Image */}
        {report.imageUrl && (
          <div className="relative w-full h-43">
            <img
              src={report.imageUrl}
              alt={report.streetName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </div>
        )}

        <div className="p-5 space-y-3">
          {/* Title */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">
              Flood Report Details
            </p>
            <h2 className="text-md font-semibold text-gray-800">
              Incident Overview
            </h2>
          </div>

          <hr className="border-gray-100" />

          {/* Street Name */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Street Name
              </p>
              <p className="text-sm font-medium text-gray-800 mt-0.5">
                {report.streetName}
              </p>
            </div>
          </div>

          {/* Depth */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Droplets className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Flood Depth
              </p>
              <span
                className={`inline-block mt-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
                  depthColors[report.depth] ?? depthColors["Knee-Deep"]
                }`}
              >
                {report.depth}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <FileText className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Description
              </p>
              <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                {report.description}
              </p>
            </div>
          </div>
          <hr className="border-gray-100" />

          {/* Create Segment Button */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCreateSegment}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Approve
            </button>
            <button
              className="w-full flex  items-center  justify-center bg-red-600 text-white font-medium text-sm rounded-xl hover:bg-red-500"
              onClick={() => handleDeleteFloodReport(report?.id)}
            >
              <span dangerouslySetInnerHTML={{ __html: trash }} />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
