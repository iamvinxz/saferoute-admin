"use client";
import Image from "next/image";
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

interface ReportDetailsProps {
  activeTab: string;
}

const depthColors: Record<string, string> = {
  "Ankle-Deep": "text-yellow-600 bg-yellow-50 border-yellow-200",
  "Knee-Deep": "text-orange-600 bg-orange-50 border-orange-200",
  "Chest-Deep": "text-red-600 bg-red-50 border-red-200",
  Critical: "text-red-800 bg-red-100 border-red-300",
};

const MapOverview = dynamic(
  () => import("@/components/notification/mapOverview"),
  { ssr: false },
);

const ReportDetails = () => {
  const dispatch = useDispatch();
  const isRouting = useSelector((state: RootState) => state.mode.isRouting);
  const router = useRouter();
  const report = useSelector((state: RootState) => state.report);
  const segments = useSelector((state: RootState) => state.segment.segments);

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
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">Hello</div>
    </div>
  );
};

export default ReportDetails;
