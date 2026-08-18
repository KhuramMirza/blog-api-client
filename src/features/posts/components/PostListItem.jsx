import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { deletePost } from "../api/deletePost.js";

const PostListItem = ({ post }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: removePost, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => toast.error("Failed to delete post"),
  });

  const handleDelete = () => {
    if (confirm(`Delete "${post.title}"? This can't be undone.`)) {
      removePost(post._id);
    }
  };

  return (
    <div className="group flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-sm transition-all hover:border-slate-600">
      <span className="truncate pr-4 font-medium text-slate-200">
        {post.title}
      </span>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => navigate(`/dashboard/posts/${post._id}/edit`)}
          disabled={isPending}
          aria-label="Edit post"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-indigo-500/10 hover:text-indigo-400 disabled:opacity-50"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={handleDelete}
          disabled={isPending}
          aria-label="Delete post"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin text-red-500" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PostListItem;
