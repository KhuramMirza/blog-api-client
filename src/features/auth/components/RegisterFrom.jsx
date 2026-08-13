import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registerUser } from "../api/registerUser.js";
import { registerSchema } from "../schemas/registerSchema.js";
import { useNavigate, useRevalidator } from "react-router";

const RegisterForm = () => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema), mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      toast.success(result?.message);
      reset();
      navigate("/dashboard", { replace: true });
      await revalidator.revalidate();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-20 flex w-100 flex-col items-center justify-center rounded-2xl bg-purple-700 px-4 py-10 text-slate-800"
    >
      <h1 className="text-3xl font-bold">Register</h1>
      <div className="w-full">
        <div className="flex flex-col gap-2 px-2 py-3">
          <label htmlFor="name" className="text-xl font-semibold">
            Name
          </label>
          <input
            {...register("name")}
            placeholder="Please choose a username"
            className="rounded-2xl bg-white p-2"
          />
          {errors.username && (
            <p className="font-semibold text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 px-2 py-3">
          <label htmlFor="email" className="text-xl font-semibold">
            Email
          </label>
          <input
            {...register("email")}
            placeholder="Please enter you email"
            className="rounded-2xl bg-white p-2"
          />
          {errors.email && (
            <p className="font-semibold text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 px-2 py-3">
          <label htmlFor="password" className="text-xl font-semibold">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Please enter your password"
            className="rounded-2xl bg-white p-2"
          />
          {errors.password && (
            <p className="font-semibold text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-2xl bg-white px-4 py-2 text-lg font-semibold hover:cursor-pointer"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
