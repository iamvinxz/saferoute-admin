import FormsField from "@/components/FormsField";
import Image from "next/image";

const LoginForm = () => {
  return (
    <div className="grid grid-cols-2 bg-white max-md:grid-cols-1  rounded-xl w-300">
      <div className="bg-blue-950 max-md:hidden border-blue-950 gap-4 text-4xl font-extrabold max-md:text-lg max-md:mb-10 text-yellow-300 shadow-lg flex flex-col  items-center justify-center h-full rounded-l-xl">
        <Image
          src="/LOGO.png"
          alt="SafeRoute Logo"
          width={300}
          height={300}
          className="pb-4 rounded-2xl max-md:w-50 max-md:mt-10 bg-white border-yellow-400 border-3"
        />
        SafeRoute Admin
        <div className=" max-md: text-sm font-extralight">© 2026</div>
      </div>

      <FormsField />
    </div>
  );
};

export default LoginForm;
