import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowLeft, Calendar, Loader2, User } from "lucide-react";

import { getPostById } from "../../features/posts/api/getPostById.js";
import BackButton from "../../components/ui/BackButton.jsx";

const PostDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <p className="text-sm font-medium text-slate-400">Loading post...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400 shadow-sm">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 opacity-80" />
        <p className="font-medium">Post not found.</p>
        <p className="mt-1 text-sm opacity-80">
          It may have been removed or doesn't exist.
        </p>
        <BackButton className="mt-6 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700">
          Go Back
        </BackButton>
      </div>
    );
  }

  const post = data?.data?.post;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Back Button */}
      <BackButton className="group mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-indigo-400">
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back
      </BackButton>

      {/* Post Header */}
      <header className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-400">
          {post.author?.name && (
            <span className="flex items-center gap-2">
              <User size={16} className="text-slate-500" />
              {post.author.name}
            </span>
          )}
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-500" />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </header>

      {/* Post Content */}
      <div className="text-lg leading-relaxed whitespace-pre-line text-slate-300">
        {post.content}
      </div>
    </article>
  );
};

export default PostDetailPage;
