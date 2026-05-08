import Image from "next/image";
import { MapPin, Droplets, Clock } from "lucide-react";
import { eye } from "@/lib/icon";
import { useDispatch } from "react-redux";
import { setReport } from "@/state/slices/selectedReport";
import { getDepthColors } from "@/lib/colorHelper";
import { useGetAllFloodReportQuery } from "@/Redux/Services/floodReportService";
import { FloodReportCardSkeleton } from "./FloodReportCardSkeleton";

const FloodReportCard = () => {
  const dispatch = useDispatch();

  //rtk query
  const { data: floodReports, isLoading: loadingFloodReports } =
    useGetAllFloodReportQuery();

  if (loadingFloodReports) return <FloodReportCardSkeleton />;

  if (!floodReports || floodReports.reports.length === 0)
    return (
      <div className="h-175 text-[#979797] text-sm flex items-center justify-center">
        No flood reports yet.
      </div>
    );

  return (
    <div className="space-y-5 ">
      {floodReports?.reports.map((report, index) => {
        const colors = getDepthColors(report.floodDepth);
        return (
          <div
            key={report._id}
            className="bg-white rounded-2xl shadow-sm border  border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {report.photoUrl && (
              <div className="relative w-full max-sm:h-20 h-40">
                <Image
                  src={report.photoUrl}
                  alt={report.streetName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              </div>
            )}

            <div className="p-4 space-y-3 max-sm:space-y-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 ">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="font-semibold text-gray-800 text-sm">
                    {report.streetName}
                  </span>
                </div>
                <span
                  className={`flex items-center gap-1 capitalize text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${colors.badge} ${colors.text}`}
                >
                  <Droplets className="w-3 h-3" />
                  {report.floodDepth}
                </span>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                {report.description}
              </p>

              <div className="flex justify-between items-center">
                {report.createdAt && (
                  <div className="flex items-center gap-1.5 pt-1 border-t border-gray-50">
                    <Clock className="w-3 h-3 text-gray-300" />
                    <span className="text-[11px] text-gray-400">
                      {new Date(report.createdAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                )}
                <span
                  dangerouslySetInnerHTML={{ __html: eye }}
                  className="hover:cursor-pointer"
                  onClick={() =>
                    dispatch(
                      setReport({
                        index,
                        id: report._id,
                        streetName: report.streetName,
                        depth: report.floodDepth,
                        description: report.description,
                        imageUrl: report.photoUrl,
                        coordinates: report.coords,
                      }),
                    )
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloodReportCard;
