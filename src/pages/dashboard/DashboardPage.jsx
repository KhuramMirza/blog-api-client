import { Link, useRouteLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, FileText, Loader2, Plus } from "lucide-react";

import { getMyPosts } from "../../features/posts/api/getMyPosts.js";
import PostListItem from "../../features/posts/components/PostListItem";

const DashboardPage = () => {
  const user = useRouteLoaderData("dashboard");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", "mine"],
    queryFn: getMyPosts,
  });

  // 1. Handle loading state early
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <p className="text-sm font-medium">Loading your posts...</p>
      </div>
    );
  }

  // 2. Handle error state early
  if (isError) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400 shadow-sm">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 opacity-80" />
        <p className="font-medium">Failed to load posts.</p>
        <p className="mt-1 text-sm opacity-80">
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  const posts = data?.result || [];

  // 3. Main render for successful data
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Dashboard Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-slate-400">
            Welcome back,{" "}
            <span className="font-medium text-slate-300">{user?.name}</span>.
            Manage your posts here.
          </p>
        </div>
        <Link
          to="/dashboard/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      {/* Content States (Empty vs List) */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-800/30 py-24 text-center text-slate-400 transition-colors hover:bg-slate-800/50">
          <FileText className="mb-4 h-12 w-12 text-slate-600" />
          <p className="text-lg font-medium text-slate-300">No posts yet</p>
          <p className="mt-1 mb-6 max-w-sm text-sm">
            You haven't written any articles. Start sharing your thoughts with
            the world!
          </p>
          <Link
            to="/dashboard/posts/new"
            className="group flex items-center gap-2 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Create your first post
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostListItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
