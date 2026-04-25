import Image from "next/image";
import { MapPin, Droplets, Clock } from "lucide-react";
import { eye } from "@/lib/icon";
import { useDispatch } from "react-redux";
import { setReport } from "@/state/slices/selectedReport";

const depthColors: Record<string, { bg: string; text: string; badge: string }> =
  {
    "Ankle-Deep": {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      badge: "bg-yellow-100",
    },
    "Knee-Deep": {
      bg: "bg-orange-50",
      text: "text-orange-700",
      badge: "bg-orange-100",
    },
    "Chest-Deep": {
      bg: "bg-red-50",
      text: "text-red-700",
      badge: "bg-red-100",
    },
    Critical: {
      bg: "bg-red-100",
      text: "text-red-800",
      badge: "bg-red-200",
    },
  };

type FloodReportCardProps = {
  index: number;
  streetName: string;
  depth: string;
  description: string;
  imageUrl?: string;
  reportedAt?: string;
};

const FloodReportCard = ({
  index,
  streetName,
  depth,
  description,
  imageUrl,
  reportedAt,
}: FloodReportCardProps) => {
  const dispatch = useDispatch();
  const colors = depthColors[depth] ?? depthColors["Knee-Deep"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-40">
          <Image
            src={imageUrl}
            alt={streetName}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="font-semibold text-gray-800 text-sm">
              {streetName}
            </span>
          </div>
          <span
            className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${colors.badge} ${colors.text}`}
          >
            <Droplets className="w-3 h-3" />
            {depth}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>

        <div className="flex justify-between items-center">
          {/* Footer */}
          {reportedAt && (
            <div className="flex items-center gap-1.5 pt-1 border-t border-gray-50">
              <Clock className="w-3 h-3 text-gray-300" />
              <span className="text-[11px] text-gray-400">{reportedAt}</span>
            </div>
          )}
          <span
            dangerouslySetInnerHTML={{ __html: eye }}
            className="hover:cursor-pointer"
            onClick={() =>
              dispatch(
                setReport({ index, streetName, depth, description, imageUrl }),
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FloodReportCard;
