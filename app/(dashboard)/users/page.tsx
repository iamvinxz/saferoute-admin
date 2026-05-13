"use client";
import React, { useState } from "react";
import {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
} from "@/Redux/Services/userService";
import { Plus, X, Users, ShieldCheck, Search } from "lucide-react";
import { createPortal } from "react-dom";

const UsersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"admins" | "users">("admins");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  const filteredAdmins = adminsData?.admins?.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.department?.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredUsers = usersData?.users?.filter(
    (u) =>
      u.phone?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .users-page * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

        .tab-btn { position: relative; transition: all 0.2s ease; }
        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 2px;
          background: #3b82f6;
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }
        .tab-btn.active::after { transform: scaleX(1); }

        .table-row { transition: background 0.15s ease; }
        .table-row:hover { background: #f1f5f9; }

        .stat-card {
          background: white;
          border: 1px solid #e8edf3;
          border-radius: 14px;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: box-shadow 0.2s;
        }
        .stat-card:hover { box-shadow: 0 4px 16px rgba(59,130,246,0.08); }

        .stat-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .modal-overlay {
          animation: fadeIn 0.18s ease;
        }
        .modal-card {
          animation: slideUp 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: none; } }

        .input-field {
          width: 100%;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.875rem;
          color: #1e293b;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fafbfc;
        }
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
          background: white;
        }
        .input-field::placeholder { color: #cbd5e1; }

        .search-wrap { position: relative; }
        .search-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
        .search-wrap input { padding-left: 38px; }

        .badge {
          display: inline-flex; align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .skeleton {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 6px;
        }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .table-container { overflow-x: auto; -webkit-overflow-scrolling: touch; }

        @media (max-width: 640px) {
          .stat-cards { flex-direction: column; }
          .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
          .add-btn { align-self: flex-end; }
        }
      `}</style>

      <div className="users-page w-full mx-auto px-4 sm:px-6 max-sm:pt-4 lg:px-8 py-8 sm:py-10">
        {/* Header — matches original style */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold max-sm:ml-12 text-blue-500">Users</h1>
            <p className="text-sm max-sm:text-xs max-sm:pl-12 text-slate-400">
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
        <div className="stat-cards flex gap-4 mb-8">
          <div className="stat-card flex-1 min-w-0">
            <div className="stat-icon bg-blue-50">
              <ShieldCheck size={20} color="#3b82f6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Admins</p>
              <p className="text-xl font-bold text-slate-800">
                {adminsData?.admins?.length ?? "—"}
              </p>
            </div>
          </div>
          <div className="stat-card flex-1 min-w-0">
            <div className="stat-icon bg-emerald-50">
              <Users size={20} color="#10b981" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">App Users</p>
              <p className="text-xl font-bold text-slate-800">
                {usersData?.users?.length ?? "—"}
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
                className={`tab-btn px-4 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "active text-blue-500"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "admins" ? "Admins" : "App Users"}
              </button>
            ))}
          </div>

          <div className="search-wrap w-full sm:w-60">
            <Search size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab === "admins" ? "admins" : "users"}...`}
              className="input-field"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          {activeTab === "admins" && (
            <div className="table-container">
              {adminsLoading ? (
                <div className="p-6 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton h-10 w-full" />
                  ))}
                </div>
              ) : (
                <table className="w-full text-sm min-w-[560px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Dept.
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredAdmins?.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-8 text-center text-sm text-slate-400"
                        >
                          No results found.
                        </td>
                      </tr>
                    )}
                    {filteredAdmins?.map((admin) => (
                      <tr key={admin._id} className="table-row">
                        <td className="px-5 py-4 font-semibold text-slate-800">
                          {admin.name}
                        </td>
                        <td className="px-5 py-4 text-slate-500">
                          {admin.email}
                        </td>
                        <td className="px-5 py-4 text-slate-500">
                          {admin.department}
                        </td>
                        <td className="px-5 py-4 text-slate-500">
                          {admin.region}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`badge ${admin.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
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

          {activeTab === "users" && (
            <div className="table-container">
              {usersLoading ? (
                <div className="p-6 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton h-10 w-full" />
                  ))}
                </div>
              ) : (
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        PWD
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredUsers?.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-8 text-center text-sm text-slate-400"
                        >
                          No results found.
                        </td>
                      </tr>
                    )}
                    {filteredUsers?.map((user) => (
                      <tr key={user._id} className="table-row">
                        <td className="px-5 py-4 font-semibold text-slate-800">
                          {user.phone}
                        </td>
                        <td className="px-5 py-4 text-slate-500">{user.age}</td>
                        <td className="px-5 py-4 text-slate-500">
                          {user.isPWD ? "Yes" : "No"}
                        </td>
                        <td className="px-5 py-4 text-slate-500 capitalize">
                          {user.role}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`badge ${user.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
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
        </div>
      </div>

      {/* Modal */}
      {isOpen &&
        createPortal(
          <div
            className="modal-overlay fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <div className="modal-card bg-white rounded-2xl shadow-2xl w-full max-w-[420px]">
              <div className="p-6 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Create Admin Account
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
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
                {error && (
                  <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                    {error}
                  </div>
                )}

                {[
                  {
                    label: "Full Name",
                    value: name,
                    setter: setName,
                    type: "text",
                    placeholder: "Enter full name...",
                  },
                  {
                    label: "Email",
                    value: email,
                    setter: setEmail,
                    type: "email",
                    placeholder: "Enter email address...",
                  },
                  {
                    label: "Password",
                    value: password,
                    setter: setPassword,
                    type: "password",
                    placeholder: "Enter password...",
                  },
                  {
                    label: "Department",
                    value: department,
                    setter: setDepartment,
                    type: "text",
                    placeholder: "e.g. LGU, DRRMO...",
                  },
                ].map(({ label, value, setter, type, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={placeholder}
                      className="input-field"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                ))}
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
