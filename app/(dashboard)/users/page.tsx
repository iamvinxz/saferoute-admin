"use client";
import React, { useState } from "react";
import {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
} from "@/Redux/Services/userService";
import { Plus, X } from "lucide-react";
import { createPortal } from "react-dom";

const UsersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"admins" | "users">("admins");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const { data: adminsData, isLoading: adminsLoading } = useGetAllAdminsQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setDepartment("");
    setError("");
  };

  const handleClose = () => {
    resetFields();
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    setError("");
    try {
      await createAdmin({ name, email, password, department }).unwrap();
      resetFields();
      setIsOpen(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-full my-10 mx-20">
      {/* Header */}
      <div className="flex items-center justify-between mr-20 mb-8">
        <div>
          <h1 className="text-xl font-bold text-blue-500">Admin Users</h1>
          <p className="text-sm ">
            Manage and create admin accounts.
          </p>
        </div>
        {activeTab === "admins" && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 mr-30 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md hover:cursor-pointer"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Add Admin</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("admins")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "admins"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Admins
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "users"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          App Users
        </button>
      </div>

      {/* Admins Table */}
      {activeTab === "admins" && (
        <div className="mr-50 bg-white rounded-xl shadow-sm overflow-hidden ">
          {adminsLoading ? (
            <p className="text-sm text-gray-400 p-6">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Department</th>
                  <th className="px-6 py-3 text-left">Region</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adminsData?.admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {admin.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{admin.email}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {admin.department}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{admin.region}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          admin.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Users Table */}
      {activeTab === "users" && (
        <div className="mr-50 bg-white rounded-xl shadow-sm overflow-hidden">
          {usersLoading ? (
            <p className="text-sm text-gray-400 p-6">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Age</th>
                  <th className="px-6 py-3 text-left">PWD</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersData?.users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.age}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {user.isPWD ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 text-gray-500 capitalize">
                      {user.role}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <div className="bg-white rounded-xl shadow-2xl p-7 w-[420px] max-w-[95vw]">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-bold text-[#1e293b]">
                  Create Admin Account
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Fill in the details to create a new admin.
              </p>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                  {error}
                </p>
              )}

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. LGU"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={handleClose}
                  className="bg-slate-100 text-slate-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
