import {
  Admin,
  AdminPagination,
  useDeleteAdminMutation,
  useDeleteUserMutation,
  User,
  UserPagination,
} from "@/Redux/Services/userService";
import { Fragment, useState } from "react";
import EditAdminModal from "./EditAdminModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TableProp {
  activeTab: string;
  adminsLoading: boolean;
  userIsLoading: boolean;
  admins: Admin[] | undefined;
  users: User[] | undefined;
  search: string;
  page: number;
  onPageChange: (page: number) => void;
  adminPagination?: AdminPagination;
  userPagination?: UserPagination;
  roleFilter?: "all" | "admin" | "rescuer";
}

const Table = ({
  activeTab,
  admins,
  users,
  adminsLoading,
  userIsLoading,
  search,
  page,
  onPageChange,
  adminPagination,
  userPagination,
  roleFilter,
}: TableProp) => {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  //rtk
  const [deleteAdmin] = useDeleteAdminMutation();
  const [deleteUser] = useDeleteUserMutation();

  //handlers;
  const filteredAdmins = admins
    ?.filter((admin) =>
      roleFilter && roleFilter !== "all" ? admin.role === roleFilter : true,
    )
    .filter(
      (admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase()) ||
        admin.department?.toLowerCase().includes(search.toLowerCase()),
    );

  const filteredUsers = users?.filter(
    (user) =>
      user.phone?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteAdmin = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await deleteAdmin(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await deleteUser(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/**desktop */}
      <div className="bg-white border border-slate-100 rounded-md shadow-sm overflow-hidden max-lg:hidden">
        {activeTab === "admins" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-140">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {adminsLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-5 bg-slate-200 rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                    </tr>
                  ))
                ) : filteredAdmins?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-8 text-center text-sm text-slate-400"
                    >
                      No results found.
                    </td>
                  </tr>
                ) : (
                  filteredAdmins?.map((admin, index) => (
                    <tr
                      key={admin._id}
                      className="hover:bg-[#f1f5f9]"
                      onClick={() => setSelectedAdmin(admin)}
                    >
                      <td className="px-5 py-4 text-[#585858]">
                        {(page - 1) * (adminPagination?.limit ?? 10) +
                          index +
                          1}
                      </td>
                      <td className="px-5 py-4 text-[#585858]">{admin.name}</td>
                      <td className="px-5 py-4 text-[#585858]">
                        {admin.email}
                      </td>
                      <td className="px-5 py-4 text-[#585858] capitalize">
                        {admin.role}
                      </td>
                      <td className="px-5 py-4 text-[#585858]">
                        {admin.region}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center tracking-wide px-4 py-1 rounded-md text-[0.72rem] font-medium ${admin.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
                        >
                          {admin.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={(e) => handleDeleteUser(e, admin._id)}
                          className="inline-flex items-center px-3 py-1 rounded-md text-[0.72rem] font-medium bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <EditAdminModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />

        {activeTab === "users" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-120">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    PWD
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {userIsLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-5 bg-slate-200 rounded" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="animate-pulse-fast h-4 w-30 bg-slate-200 rounded-md" />
                      </td>
                    </tr>
                  ))
                ) : filteredUsers?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-8 text-center text-sm text-slate-400"
                    >
                      No results found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map((user, index) => (
                    <tr key={user._id} className="hover:bg-[#f1f5f9]">
                      <td className="px-5 py-4 text-[#848484]">
                        {(page - 1) * (userPagination?.limit ?? 10) + index + 1}
                      </td>
                      <td className="px-5 py-4 text-[#848484]">{user.phone}</td>
                      <td className="px-5 py-4 text-[#848484]">{user.age}</td>
                      <td className="px-5 py-4 text-[#848484]">
                        {user.isPWD ? "Yes" : "No"}
                      </td>
                      <td className="px-5 py-4 text-[#848484] capitalize">
                        {user.role}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center tracking-wide px-4 py-1 rounded-md text-[0.72rem] font-medium ${user.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={(e) => handleDeleteUser(e, user._id)}
                          className="inline-flex items-center px-3 py-1 rounded-md text-[0.72rem] font-medium bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/**small screens */}
      <div className="lg:hidden max-h-200 overflow-y-auto">
        {activeTab === "admins" && (
          <div className="divide-y divide-slate-100">
            {adminsLoading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-slate-200 animate-pulse-fast" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="h-3 w-28 bg-slate-200 rounded animate-pulse-fast" />
                      <div className="h-4 w-14 bg-slate-200 rounded-md animate-pulse-fast" />
                    </div>
                    <div className="h-2.5 w-40 bg-slate-200 rounded animate-pulse-fast mb-2" />
                    <div className="h-2 w-24 bg-slate-200 rounded animate-pulse-fast" />
                  </div>
                </div>
              ))
            ) : filteredAdmins?.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-slate-400">
                No results found.
              </p>
            ) : (
              filteredAdmins?.map((admin) => (
                <div
                  key={admin._id}
                  className="flex items-start gap-3 py-3 border-b border-slate-200"
                >
                  {/* avatar pang fill ng space */}
                  <div className="shrink-0 w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-500 text-xs font-semibold">
                      {admin.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[#303030] font-medium text-xs truncate">
                        {admin.name}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[0.65rem] font-medium shrink-0
                    ${admin.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="text-[#707070] text-[10px] truncate mb-1">
                      {admin.email}
                    </p>

                    <p className="text-[#848484] text-[9px]">
                      {admin.department ?? "—"} · {admin.region ?? "—"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div className="divide-y divide-slate-100">
            {userIsLoading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-slate-200 animate-pulse-fast" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="h-3 w-28 bg-slate-200 rounded animate-pulse-fast" />
                      <div className="h-4 w-14 bg-slate-200 rounded-md animate-pulse-fast" />
                    </div>
                    <div className="h-2.5 w-32 bg-slate-200 rounded animate-pulse-fast mb-2" />
                    <div className="h-2 w-20 bg-slate-200 rounded animate-pulse-fast" />
                  </div>
                </div>
              ))
            ) : filteredUsers?.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-slate-400">
                No results found.
              </p>
            ) : (
              filteredUsers?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-start gap-3 py-3 border-b border-slate-200"
                >
                  {/* avarat pang fill ng space */}
                  <div className="shrink-0 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-400 text-xs font-semibold">
                      {user.phone?.charAt(0) ?? "U"}
                    </span>
                  </div>

                  {/* content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[#303030] font-medium text-xs truncate">
                        {user.phone ?? "—"}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[0.65rem] font-medium shrink-0
                    ${user.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="text-[#707070] text-[10px] capitalize mb-1">
                      {user.role ?? "—"} {user.isPWD ? "· PWD" : ""}
                    </p>

                    <p className="text-[#848484] text-[9px]">
                      Age: {user.age ?? "—"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {(() => {
        const pagination =
          activeTab === "admins" ? adminPagination : userPagination;
        if (!pagination || pagination.totalPages <= 1) return null;
        return (
          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-xs text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={!pagination.hasPrevPage}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={!pagination.hasNextPage}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })()}
    </Fragment>
  );
};

export default Table;
