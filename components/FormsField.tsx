"use client";
import { useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const FormsField = () => {
  const { register } = useForm();
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

      <div className="space-y-5 mb-20">
        <FieldGroup>
          <Field>
            <FieldLabel className="text-md">Email</FieldLabel>
            <Input className="h-10" />
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel className="text-md">Password</FieldLabel>
            <Input className="h-10" />
          </Field>
        </FieldGroup>
      </div>
      <div className="my-5">
        <Button className="w-full h-12 bg-[#5f7ed1]">Submit</Button>
      </div>
    </div>
  );
};

export default FormsField;
