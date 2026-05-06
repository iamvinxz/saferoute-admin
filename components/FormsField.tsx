"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/Redux/Services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "@/state/slices/authSlice";
import type { AppDispatch } from "@/state/store";

type FormsFields = {
  email: string;
  password: string;
};

const FormsField = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm<FormsFields>();

  //rtk query
  const [signIn] = useLoginMutation();

  //handle functions
  const handleSignIn: SubmitHandler<FormsFields> = async (data, e) => {
    e?.preventDefault();

    try {
      const credentials = await signIn({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setUser(credentials.user));

      router.push("/dashboard");
    } catch (error: any) {
      console.log("login error:", error.message);
    }
  };

  return (
    <div className="p-20 max-md:px-20 max-md:py-0 max-md:mt-10  max-md:h-100">
      <div className="flex flex-col items-center justify-center \">
        <h1 className="text-3xl max-md:mb-3 font-semibold">Login</h1>
        <Image
          src="/user-removed.png"
          alt="user.png"
          width={200}
          height={200}
          className="max-md:w-20"
        />
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col justify-center max-md:mx-10 max-md:px-50"
      >
        <div className="space-y-5 mb-10">
          <FieldGroup>
            <Field>
              <FieldLabel className="text-md">Email</FieldLabel>
              <Input type="email" {...register("email")} className="h-10" />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel className="text-md">Password</FieldLabel>
              <Input
                type="password"
                {...register("password")}
                className="h-10"
              />
            </Field>
          </FieldGroup>
        </div>
        <div className="flex justify-center">
          <Button className="w-60 h-10 bg-[#5f7ed1]" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormsField;
