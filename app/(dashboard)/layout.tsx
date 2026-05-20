"use client";
import SideBar from "@/components/SideBar";
import { useWebSocket } from "@/lib/useWebSocket";
import { useGetMeQuery } from "@/Redux/Services/authService";
import {
  clearUser,
  setUser,
  setCoordinates,
  setWatchId,
} from "@/state/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import { RootState } from "@/state/store";
import { isMobileDevice } from "@/lib/deviceHelper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isSuccess, isError } = useGetMeQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: sosResponse } = useGetAllSosAlertQuery();

  // useWebSocket();

  // rehydrate user
  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }
    if (isError) {
      dispatch(clearUser());
      router.push("/auth/login");
    }
  }, [isSuccess, isError, data]);

  // restart tracking on refresh if rescuer has active rescue
  useEffect(() => {
    const hasActiveRescue = sosResponse?.alerts?.some(
      (alert) =>
        alert.status === "dispatched" && alert.rescuerId?._id === user?._id,
    );

    if (hasActiveRescue) {
      let watchId: number;
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setCoordinates([latitude, longitude]));
          dispatch(setWatchId(watchId));
        },
        (error) => console.error("Error getting location:", error.message),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: isMobileDevice() ? 5000 : undefined,
        },
      );
    }
  }, [sosResponse, user]);

  return (
    <div className="h-screen flex">
      <SideBar />
      <main className="w-full h-screen overflow-auto transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout;
