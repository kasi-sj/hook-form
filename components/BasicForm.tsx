// npm i react-hook-form
// npm i @hookform/resolvers
// npm i zod

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

const BasicForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "test@email.com",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: FormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error("Something went wrong");
      console.log(data);
    } catch (e) {
      setError("root", { message: "Something went wrong" });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-2 flex flex-col">
        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className="p-2 rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className="p-2 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={"bg-blue-500 text-white p-2 rounded-md"}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </div>
  );
};

export default BasicForm;
