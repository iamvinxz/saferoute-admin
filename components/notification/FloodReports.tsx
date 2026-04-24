import FloodReportCard from "./FloodReportCard";
import { FloodReport } from "@/state/slices/segment";

type Props = {
  onSelect: (report: FloodReport) => void; // ✅
};

const FloodReports = ({ onSelect }: Props) => {
  const reports = [
    {
      streetName: "J.P Rizal Ave",
      depth: "Knee-Deep",
      description: "Flood here is very severe, road is impassable.",
      imageUrl: "/japan.png",
      reportedAt: "Today, 10:32 AM",
    },
    {
      streetName: "Crispin Street",
      depth: "Ankle-Deep",
      description: "Minor flooding near the intersection.",
      imageUrl: "/street.jpg",
      reportedAt: "Today, 9:15 AM",
    },
    {
      streetName: "Blumentritt Road",
      depth: "Critical",
      description: "Road completely submerged, avoid this route.",
      imageUrl: "/night-street.jpg",
      reportedAt: "Today, 8:50 AM",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Alert Banner */}
      {/* <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
        <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
        <p className="text-xs text-orange-700 font-medium">
          {reports.length} active flood reports in your area
        </p>
      </div> */}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3">
        {reports.map((report, index) => (
          <FloodReportCard
            key={index}
            {...report}
            onClick={() => onSelect(report)}
          />
        ))}
      </div>
    </div>
  );
};

export default FloodReports;
