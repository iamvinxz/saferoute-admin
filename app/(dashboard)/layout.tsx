"use client";
import SideBar from "@/components/SideBar";
import { useGetMeQuery } from "@/Redux/Services/authService";
import { clearUser, setUser } from "@/state/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isSuccess, isError } = useGetMeQuery();

  console.log("data", data);

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }

    if (isError) {
      dispatch(clearUser());
      router.push("/auth/login");
    }
  }, [isSuccess, isError, data]);

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
