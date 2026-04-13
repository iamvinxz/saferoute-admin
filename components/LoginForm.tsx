import FormsField from "@/components/FormsField";

const LoginForm = () => {
  return (
    <div className="grid grid-cols-2 w-280 h-170 rounded-md shadow-md">
      <div className="bg-[#5f7ed1] rounded-tl-md rounded-bl-md"></div>
      <FormsField />
    </div>
  );
};

export default LoginForm;
