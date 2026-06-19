import { useEffect, useRef, useState } from "react";
import {
  Admin,
  EditAdminRequest,
  useEditAdminMutation,
} from "@/Redux/Services/userService";

interface EditAdminModalProps {
  admin: Admin | null;
  onClose: () => void;
}

const EditAdminModal = ({ admin, onClose }: EditAdminModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const roles = ["admin", "rescuer"];
  const [roleOpen, setRoleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [editAdmin, { isLoading, error }] = useEditAdminMutation();

  // Populate form when a new admin is selected
  useEffect(() => {
    if (admin) {
      setForm({
        name: admin.name,
        email: admin.email,
        password: "",
        role: admin.role,
      });
    }
  }, [admin]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setRoleOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!admin) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const payload: EditAdminRequest = {
        id: admin._id,
        name: form.name,
        email: form.email,
        role: form.role,
        ...(form.password && { password: form.password }),
      };

      await editAdmin(payload).unwrap();
      onClose();
    } catch (err) {
      console.error("Edit admin failed:", err);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose} // close on backdrop click
    >
      {/* Modal */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-[#303030]">Edit Admin</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-[#303030] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-[#303030] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              New Password{" "}
              <span className="text-slate-400 font-normal">
                (leave blank to keep current)
              </span>
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-[#303030] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Role
            </label>
            <div ref={dropdownRef} className="relative">
              {/* Trigger */}
              <button
                type="button"
                onClick={() => setRoleOpen((prev) => !prev)}
                className="w-full flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2 text-sm text-[#303030] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition capitalize"
              >
                {form.role || "Select role"}
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${roleOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Options */}
              {roleOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, role }));
                        setRoleOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm capitalize transition-colors hover:bg-slate-50
              ${form.role === role ? "text-blue-500 font-medium bg-blue-50/50" : "text-[#303030]"}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-3 text-xs text-red-500">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdminModal;
