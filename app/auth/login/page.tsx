import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div
      className="min-h-screen w-full flex justify-center items-center bg-cover bg-center bg-no-repeat px-4 py-10"
      style={{ backgroundImage: "url(/flood.png)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Login form above the overlay */}
      <div className="relative z-10 w-full max-w-sm md:max-w-2xl lg:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
