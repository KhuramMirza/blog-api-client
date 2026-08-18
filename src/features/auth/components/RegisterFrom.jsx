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
    <div className="mx-auto mt-20 w-full max-w-md px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-xl"
      >
        <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-white">
          Create an Account
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-300"
            >
              Name
            </label>
            <input
              {...register("name")}
              placeholder="Choose a username"
              className="rounded-lg border border-slate-600 bg-slate-900 p-2.5 text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            {errors.username && (
              <p className="text-sm font-medium text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              {...register("email")}
              placeholder="name@example.com"
              className="rounded-lg border border-slate-600 bg-slate-900 p-2.5 text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-sm font-medium text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Create a password"
              className="rounded-lg border border-slate-600 bg-slate-900 p-2.5 text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            {errors.password && (
              <p className="text-sm font-medium text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
