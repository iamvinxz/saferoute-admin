import FloodReportCard from "./FloodReportCard";

const FloodReports = () => {
  const reports = [
    {
      streetName: "Colonel Espiritu Street",
      depth: "Knee-Deep",
      description: "Flood here is very severe, road is impassable.",
      coordinates: [14.673379504810953, 120.96788406372072] as [number, number],
      imageUrl: "/japan.png",
      reportedAt: "Today, 10:32 AM",
    },
    {
      streetName: "Crispin Street",
      depth: "Ankle-Deep",
      description: "Minor flooding near the intersection.",
      coordinates: [14.670584962500524, 120.96884161233903] as [number, number],
      imageUrl: "/street.jpg",
      reportedAt: "Today, 9:15 AM",
    },
    {
      streetName: "Mañalac Street",
      depth: "Critical",
      description: "Road completely submerged, avoid this route.",
      coordinates: [14.671251815671544, 120.96389293670656] as [number, number],
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
