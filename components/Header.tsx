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
    <div className="w-full  max-md:px-0 max-sm:pl-11  max-sm:mt-0 max-md: ">
      <div className="flex items-center max-sm:pt-0 justify-between">
        <div className="">
          <p className="max-sm:text-xs">Welcome, {user?.name}!</p>
          <h1 className="font-semibold max-sm:text-sm text-xl text-blue-600">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2 pr-15">
          <div className="rounded-full bg-gray-200  max-sm:w-5 max-sm:h-5  w-10 h-10"></div>
          <span className="capitalize max-sm:text-xs">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
