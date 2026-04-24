"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addSegment, updateFloodReport } from "@/state/slices/segment";
import { MapPin, Droplets, FileText, Navigation } from "lucide-react";

type Props = {
  streetName: string;
  depth: string;
  description: string;
  imageUrl?: string;
  reportedAt?: string;
};

const depthColors: Record<string, string> = {
  "Ankle-Deep": "text-yellow-600 bg-yellow-50 border-yellow-200",
  "Knee-Deep": "text-orange-600 bg-orange-50 border-orange-200",
  "Chest-Deep": "text-red-600 bg-red-50 border-red-200",
  Critical: "text-red-800 bg-red-100 border-red-300",
};

const ReportDetails = ({
  streetName,
  depth,
  description,
  imageUrl,
  reportedAt,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCreateSegment = () => {
    dispatch(addSegment()); // ✅ adds first segment
    dispatch(
      updateFloodReport({ index: 0, field: "streetName", value: streetName }),
    );
    dispatch(updateFloodReport({ index: 0, field: "depth", value: depth }));
    dispatch(
      updateFloodReport({ index: 0, field: "description", value: description }),
    );
    router.push("/maps"); // ✅ redirect to map
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-48">
          <img
            src={imageUrl}
            alt={streetName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="p-5 space-y-5">
        {/* Title */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">
            Flood Report Details
          </p>
          <h2 className="text-lg font-semibold text-gray-800">
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
              {streetName}
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
                depthColors[depth] ?? depthColors["Knee-Deep"]
              }`}
            >
              {depth}
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
              {description}
            </p>
          </div>
        </div>

        {/* Reported At */}
        {reportedAt && (
          <p className="text-xs text-gray-400">Reported: {reportedAt}</p>
        )}

        <hr className="border-gray-100" />

        {/* Create Segment Button */}
        <button
          onClick={handleCreateSegment}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Create Segment
        </button>
      </div>
    </div>
  );
};

export default ReportDetails;
