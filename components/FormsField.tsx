"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/Redux/Services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "@/state/slices/authSlice";
import type { AppDispatch } from "@/state/store";
import { useState } from "react";

type FormsFields = {
  email: string;
  password: string;
};

const FormsField = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormsFields>();

  const [signIn] = useLoginMutation();

  const handleSignIn: SubmitHandler<FormsFields> = async (data, e) => {
    e?.preventDefault();
    setServerError(null);
    try {
      const credentials = await signIn({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setUser(credentials.user));
      router.push("/dashboard");
    } catch (error) {
      setServerError("Invalid email or password. Please try again.");
    }
  };

  const inputBase =
    "w-full py-2 px-4 rounded-md border text-xs transition-all duration-200 outline-none bg-white " +
    "border-gray-200 text-gray-800 placeholder-gray-400 " +
    "focus:border-[#5f7ed1] focus:ring-2 focus:ring-[#5f7ed1]/20";

  const inputError = "border-red-400 focus:border-red-400 focus:ring-red-100";

  return (
    <div className="h-full overflow-y-auto px-8 md:px-12 relative">
      {/* Header */}
      <div className="flex flex-col items-center justify-center my-4 lg:my-10">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3 ring-4 ring-gray-50">
          <Image
            src="/user-removed.png"
            alt="user"
            width={50}
            height={50}
            className="opacity-60"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Welcome Admin
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Sign in to your admin account
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col justify-between h-75"
        noValidate
      >
        <div className="flex flex-col gap-3 h-full">
          {/* Email */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="admin@saferoute.com"
              className={`${inputBase} ${errors.email ? inputError : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`${inputBase} pr-11 ${errors.password ? inputError : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {!showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Server error — fixed height slot, never grows the card */}
        {serverError && (
          <div className="absolute bottom-25 flex items-center">
            <div className="w-full flex items-center gap-2.5 bg-red-50  text-red-700 text-xs rounded-lg px-4 py-2.5 max-w-70">
              <svg
                className="w-4 h-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {serverError}
            </div>
          </div>
        )}

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-lg bg-[#5f7ed1] hover:bg-[#4a6bbf] active:scale-[0.98]
                     text-white text-sm font-semibold tracking-wide transition-all duration-200
                     disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center mb-7"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormsField;
