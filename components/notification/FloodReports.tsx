import FloodReportCard from "./FloodReportCard";

const FloodReports = () => {
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
    <div className="space-y-6">
      {reports.map((report, index) => {
        const reportIndexed = { ...report, index };
        return <FloodReportCard key={index} {...reportIndexed} />;
      })}
    </div>
  );
};

export default FloodReports;
