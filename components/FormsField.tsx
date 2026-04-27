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

      console.log(credentials);

      // Set token in cookie for middleware
      document.cookie = `accessToken=${credentials.token}; path=/; SameSite=Strict`;

      dispatch(setUser(credentials.user));

      router.push("/dashboard");
    } catch (error: any) {
      console.log("login error:", error.message);
    }
  };

  return (
    <div className="p-10">
      <div className="flex flex-col items-center justify-center mt-5">
        <h1 className="text-3xl font-semibold">Login</h1>
        <Image
          src="/user-removed.png"
          alt="user.png"
          width={200}
          height={200}
        />
      </div>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="space-y-5 mb-20">
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
        <div className="my-5">
          <Button className="w-full h-12 bg-[#5f7ed1]" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormsField;
