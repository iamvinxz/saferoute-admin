"use client";
import LoadingScreen from "@/components/LoadingScreen";
import dynamic from "next/dynamic";
const Map = dynamic(
  () =>
    new Promise((resolve) => setTimeout(resolve, 2000)).then(
      () => import("@/components/Map"),
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);

export default function MapsPage() {
  return (
    <div className="h-[100dvh] w-full overflow-hidden">
      <Map />
    </div>
  );
}
