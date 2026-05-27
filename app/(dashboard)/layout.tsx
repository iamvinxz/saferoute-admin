"use client";
import SideBar from "@/components/SideBar";
import { useWebSocket } from "@/lib/useWebSocket";
import { useGetMeQuery } from "@/Redux/Services/authService";
import { clearUser, setUser } from "@/state/slices/authSlice";
import { RootState } from "@/state/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isSuccess, isError, isLoading } = useGetMeQuery();
  const user = useSelector((state: RootState) => state.auth.user);

  useWebSocket();

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

  if (isLoading || !user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#F5F6F9] gap-4">
        <Image
          src="/LOGO.jpg"
          alt="logo"
          width={80}
          height={80}
          className="rounded-xl"
        />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#dbdbdb] rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-[#dbdbdb] rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-[#dbdbdb] rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

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
