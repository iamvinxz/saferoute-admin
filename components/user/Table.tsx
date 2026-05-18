import { Admin, User } from "@/Redux/Services/userService";

interface TableProp {
  activeTab: string;
  adminsLoading: boolean;
  userIsLoading: boolean;
  admins: Admin[] | undefined;
  users: User[] | undefined;
  search: string;
}

const Table = ({
  activeTab,
  admins,
  users,
  adminsLoading,
  userIsLoading,
  search,
}: TableProp) => {
  //handlers;
  const filteredAdmins = admins?.filter(
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

  return (
    <div className="bg-white border border-slate-100 rounded-md shadow-sm overflow-hidden">
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
                  Dept.
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
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
                  <tr key={admin._id} className="hover:bg-[#f1f5f9]">
                    <td className="px-5 py-4 text-[#585858]">{index + 1}</td>
                    <td className="px-5 py-4 text-[#585858]">{admin.name}</td>
                    <td className="px-5 py-4 text-[#585858]">{admin.email}</td>
                    <td className="px-5 py-4 text-[#585858]">
                      {admin.department}
                    </td>
                    <td className="px-5 py-4 text-[#585858]">{admin.region}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center tracking-wide px-4 py-1 rounded-md text-[0.72rem] font-medium ${admin.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

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
                    <td className="px-5 py-4 text-[#848484]">{index + 1}</td>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
