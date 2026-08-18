import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { postSchema } from "../schemas/postSchema.js";

const PostForm = ({ defaultValues, onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: defaultValues || { title: "", content: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-slate-300">
          Post Title
        </label>
        <input
          id="title"
          {...register("title")}
          placeholder="E.g., Getting Started with React"
          className="rounded-lg border border-slate-600 bg-slate-900 p-2.5 text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        {errors.title && (
          <p className="text-sm font-medium text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm font-medium text-slate-300">
          Content
        </label>
        <textarea
          id="content"
          {...register("content")}
          placeholder="Write your post content here..."
          rows={12}
          className="w-full resize-y rounded-lg border border-slate-600 bg-slate-900 p-2.5 text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        {errors.content && (
          <p className="text-sm font-medium text-red-400">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? "Saving..." : "Save Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
