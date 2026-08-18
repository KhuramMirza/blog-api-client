import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import PostForm from "../../features/posts/components/PostForm";
import { createPost } from "../../features/posts/api/createPost.js";
import BackButton from "../../components/ui/BackButton.jsx";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to create post";
      toast.error(message);
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Back Navigation */}
      <BackButton className="group mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-indigo-400">
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to Dashboard
      </BackButton>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Create New Post
        </h1>
        <p className="mt-2 text-slate-400">
          Share your thoughts, ideas, or tutorials with the world.
        </p>
      </div>

      {/* Form Container */}
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl sm:p-8">
        <PostForm onSubmit={mutate} isSubmitting={isPending} />
      </div>
    </div>
  );
};

export default CreatePostPage;
