import React from "react";

const Header = () => {
  return (
    <div className="w-full px-20">
      <div className="flex items-center justify-between">
        <div>
          <p>Welcome, Admin!</p>
          <h1 className="font-semibold text-xl text-blue-600">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gray-200 w-10 h-10"></div>
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
