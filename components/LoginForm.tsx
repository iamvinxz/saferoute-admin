import FormsField from "@/components/FormsField";
import Image from "next/image";

const LoginForm = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 bg-white rounded-2xl w-full shadow-2xl overflow-hidden h-[560px]">
      {/* Left panel — desktop only */}
      <div className="hidden md:flex bg-[#0f1e4a] flex-col items-center justify-center py-14 px-8 gap-6 relative overflow-hidden h-full">
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-white/5" />

        <div className="bg-white rounded-2xl p-2 shadow-md border-2 border-yellow-400/80">
          <Image
            src="/LOGO.png"
            alt="SafeRoute Logo"
            width={110}
            height={110}
            className="rounded-xl"
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-yellow-300 leading-tight tracking-tight">
            SafeRoute Admin
          </h2>
          <p className="text-blue-200/60 text-xs mt-2 font-light tracking-widest uppercase">
            Emergency Management System
          </p>
        </div>
        <div className="w-12 h-px bg-yellow-400/30 mt-2" />
        <p className="text-blue-100/40 text-xs">© 2026 SafeRoute</p>
      </div>

      {/* Mobile logo header */}
      <div className="md:hidden bg-[#0f1e4a] border-b-5 border-yellow-300 flex flex-col items-center justify-center py-6 gap-2">
        <div className="bg-white rounded-xl p-1.5 border-2 border-yellow-400">
          <Image
            src="/LOGO.png"
            alt="SafeRoute Logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
        </div>
        <span className="text-yellow-300 font-extrabold text-base tracking-tight">
          SafeRoute Admin
        </span>
      </div>

      {/* Right: form — clips overflow so errors don't expand the card */}
      <div className="h-full  overflow-hidden">
        <FormsField />
      </div>
    </div>
  );
};

export default LoginForm;
