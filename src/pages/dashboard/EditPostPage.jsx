import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { getPostById } from "../../features/posts/api/getPostById.js";
import { updatePost } from "../../features/posts/api/updatePost.js";

import PostForm from "../../features/posts/components/PostForm";
import BackButton from "../../components/ui/BackButton.jsx";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => updatePost(id, payload),
    onSuccess: () => {
      toast.success("Post updated!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to update post";
      toast.error(message);
    },
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <p className="text-sm font-medium">Loading post...</p>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400 shadow-sm">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 opacity-80" />
        <p className="font-medium">Failed to load post.</p>
        <p className="mt-1 text-sm opacity-80">
          It may have been deleted or doesn't exist.
        </p>
      </div>
    );
  }

  const post = data?.data?.post;

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
          Edit Post
        </h1>
        <p className="mt-2 text-slate-400">
          Make changes to your existing post.
        </p>
      </div>

      {/* Form Container */}
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl sm:p-8">
        <PostForm
          defaultValues={{ title: post?.title, content: post?.content }}
          onSubmit={mutate}
          isSubmitting={isPending}
        />
      </div>
    </div>
  );
};

export default EditPostPage;
