"use client";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";

const Header = () => {
  //global state
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <div className="w-full max-md:px-5 max-md:ml-5 px-20">
      <div className="flex items-center justify-between">
        <div>
          <p>Welcome, {user?.name}!</p>
          <h1 className="font-semibold text-xl text-blue-600">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gray-200 w-10 h-10"></div>
          <span className="capitalize">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
