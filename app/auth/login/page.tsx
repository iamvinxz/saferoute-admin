import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url(/flood.png)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Login form above the overlay */}
      <div className="relative  z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
