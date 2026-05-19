"use client";
import { useState } from "react";
import {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
} from "@/Redux/Services/userService";
import {
  Plus,
  X,
  Users,
  ShieldCheck,
  Search,
  Eye,
  EyeOff,
  Menu,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  clearAccount,
  setDepartment,
  setEmail,
  setError,
  setName,
  setPassword,
} from "@/state/slices/accountSlice";
import { Input } from "@/components/ui/input";
import Table from "@/components/user/Table";
import SideBar from "@/components/SideBar";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { name, email, password, department, error } = useSelector(
    (state: RootState) => state.account,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"admins" | "users">("admins");
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  //rtk
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const { data: adminResponse, isLoading: adminsLoading } =
    useGetAllAdminsQuery();
  const { data: userResponse, isLoading: usersLoading } = useGetAllUsersQuery();

  const handleClose = () => {
    dispatch(clearAccount());
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await createAdmin({ name, password, department, email }).unwrap();
      dispatch(clearAccount());
      setIsOpen(false);
    } catch (err) {
      dispatch(setError("Something went wrong. Please try again."));
      console.error(err);
    }
  };

  return (
    <div className="min-h-full w-full bg-[#f8fafc] px-[9vw] py-[5vh]">
      {/* Header — matches original style */}
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <div>
          <h1 className="font-semibold text-[#1A5EFD] md:text-lg">Users</h1>
          <p className="text-[#848484] text-[10px] lg:text-sm">
            Manage and create accounts.
          </p>
        </div>
        <div className="hidden lg:block">
          {activeTab === "admins" && (
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center  bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium transition-all rounded-md px-1 py-1 lg:px-4 lg:py-2 lg:rounded-lg "
            >
              <Plus size={16} strokeWidth={2.5} />
              <span className="hidden lg:inline">Add Admin</span>
            </button>
          )}
        </div>
        {/**menu button for tab and mobile */}
        <div className="lg:hidden">
          <button
            className="text-[#303030]"
            onClick={() => setOpenSideBar(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4 mb-4 lg:mb-8">
        {adminsLoading || usersLoading ? (
          <>
            {/**skeleton */}
            <div className="stat-card flex-1 min-w-0">
              <div className="stat-icon bg-slate-200 animate-pulse-fast"></div>
              <div className="space-y-2">
                <div className="bg-slate-200 w-20 h-3 rounded-lg animate-pulse-fast" />
                <div className="bg-slate-200 w-10 h-5 rounded-md animate-pulse-fast" />
              </div>
            </div>
            <div className="stat-card flex-1 min-w-0">
              <div className="stat-icon bg-slate-200 animate-pulse-fast"></div>
              <div className="space-y-2">
                <div className="bg-slate-200 w-20 h-3 rounded-lg animate-pulse-fast" />
                <div className="bg-slate-200 w-10 h-5 rounded-md animate-pulse-fast" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="stat-card flex-1 px-3 py-3 lg:px-5 lg:py-5">
              <div className="stat-icon bg-blue-50 h-10 w-10">
                <ShieldCheck size={20} color="#3b82f6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium max-lg:text-[10px]">
                  Total Admins
                </p>
                <p className="text-xl font-bold text-slate-800 max-lg:text-[20px]">
                  {adminResponse?.admins?.length}
                </p>
              </div>
            </div>
            <div className="stat-card flex-1 px-3 py-3 lg:px-5 lgpy-5">
              <div className="stat-icon bg-emerald-50 h-10 w-10">
                <Users size={20} color="#10b981" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium max-lg:text-[10px]">
                  Residents
                </p>
                <p className="text-xl font-bold text-slate-800 max-lg:text-[20px]">
                  {userResponse?.users?.length}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="lg:hidden">
        <SideBar open={openSideBar} setOpen={setOpenSideBar} />
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex justify-between">
          <div className="flex gap-1 border-b border-slate-200 w-fit">
            {(["admins", "users"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearch("");
                }}
                className={`tab-btn px-4 py-2.5 text-sm font-medium transition-colors max-lg:text-[11px] ${
                  activeTab === tab
                    ? "active text-blue-500 font-semibold"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "admins" ? "Admins" : "Residents"}
              </button>
            ))}
          </div>
          <div className="lg:hidden">
            {activeTab === "admins" && (
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center  bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium transition-all rounded-md px-1 py-1 lg:px-4 lg:py-2 lg:rounded-lg "
              >
                <Plus size={16} strokeWidth={2.5} />
                <span className="hidden lg:inline">Add Admin</span>
              </button>
            )}
          </div>
        </div>

        <div className="w-full relative">
          <Search size={15} className="absolute left-3 top-2" color="#94a3b8" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeTab === "admins" ? "admins" : "residents"}`}
            className="w-full border border-[#e2e9f0] outline-none rounded-md pl-9.5 pr-2 py-1 text-[0.87rem] bg-[#fafbfc] text-[#303030]"
          />
        </div>
      </div>
      <Table
        activeTab={activeTab}
        admins={adminResponse?.admins}
        users={userResponse?.users}
        adminsLoading={adminsLoading}
        userIsLoading={usersLoading}
        search={search}
      />

      {/* Modal */}
      {isOpen &&
        createPortal(
          <div
            className="modal-overlay fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <div className="modal-card bg-white rounded-2xl shadow-2xl w-full max-w-105">
              <div className="p-6 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-medium text-[#303030]">
                      Create an account
                    </h2>
                    <p className="text-xs text-[#848484] mt-0.5">
                      Fill in the details to create a new admin.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-slate-300 hover:text-slate-500 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="font-medium text-xs text-[#303030]">
                    Fullname
                  </label>
                  <Input
                    type="text"
                    value={name}
                    placeholder="Enter your fullname"
                    onChange={(e) => dispatch(setName(e.target.value))}
                    className="border rounded-md placeholder:text-xs focus-visible:ring-1 p-4"
                  />
                </div>
                <div>
                  <label className="font-medium text-xs text-[#303030]">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    className="border rounded-md placeholder:text-xs focus-visible:ring-1 p-4"
                  />
                </div>
                <div>
                  <label className="font-medium text-xs text-[#303030]">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      placeholder="Enter your password"
                      onChange={(e) => dispatch(setPassword(e.target.value))}
                      className="border rounded-md placeholder:text-xs focus-visible:ring-1 relative p-4"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2  text-gray-500 hover:cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="font-medium text-xs text-[#303030]">
                    Department
                  </label>
                  <Input
                    type="text"
                    value={department}
                    placeholder="Enter the assigned department"
                    onChange={(e) => dispatch(setDepartment(e.target.value))}
                    className="border rounded-md placeholder:text-xs focus-visible:ring-1 p-4"
                  />
                </div>
              </div>

              <div className="px-6 pb-6 flex justify-end gap-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all shadow-sm shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default UsersPage;
