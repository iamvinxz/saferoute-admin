"use client";
import { useState } from "react";
import {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
} from "@/Redux/Services/userService";
import { Plus, X, Users, ShieldCheck, Search, Eye, EyeOff } from "lucide-react";
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

const UsersPage = () => {
  const dispatch = useDispatch();
  const { name, email, password, department, error } = useSelector(
    (state: RootState) => state.account,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"admins" | "users">("admins");
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
    <div className="min-h-screen bg-[#f8fafc] w-full">
      <div className="users-page w-full mx-auto sm:px-6 max-sm:pt-4 lg:px-[9vw] lg:py-[5vh] sm:py-10">
        {/* Header — matches original style */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold max-sm:ml-12 text-[#1A5EFD]">
              Users
            </h1>
            <p className="text-sm max-sm:text-xs max-sm:pl-12 text-[#848484]">
              Manage and create accounts.
            </p>
          </div>
          {activeTab === "admins" && (
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center  bg-blue-400 hover:bg-blue-500 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add Admin</span>
            </button>
          )}
        </div>

        {/* Stat Cards */}
        <div className="flex gap-4 mb-8">
          <div className="stat-card flex-1 min-w-0">
            <div className="stat-icon bg-blue-50">
              <ShieldCheck size={20} color="#3b82f6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Admins</p>
              <p className="text-xl font-bold text-slate-800">
                {adminResponse?.admins?.length ?? "—"}
              </p>
            </div>
          </div>
          <div className="stat-card flex-1 min-w-0">
            <div className="stat-icon bg-emerald-50">
              <Users size={20} color="#10b981" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Residents</p>
              <p className="text-xl font-bold text-slate-800">
                {userResponse?.users?.length ?? "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex gap-1 border-b border-slate-200 w-fit">
            {(["admins", "users"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearch("");
                }}
                className={`tab-btn px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "active text-blue-500 font-semibold"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "admins" ? "Admins" : "Residents"}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-60 relative">
            <Search
              size={15}
              className="absolute left-3 top-2"
              color="#94a3b8"
            />
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
      </div>

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
