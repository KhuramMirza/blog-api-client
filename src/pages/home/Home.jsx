import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";

import { getPosts } from "../../features/posts/api/getPosts.js";
import PostCard from "../../features/posts/components/PostCard.jsx";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <p className="text-sm font-medium text-slate-400">Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400 shadow-sm">
        <AlertCircle className="mx-auto mb-3 h-8 w-8 opacity-80" />
        <p className="font-medium">Failed to load posts.</p>
        <p className="mt-1 text-sm opacity-80">Please try again later.</p>
      </div>
    );
  }

  const posts = data?.result || [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Latest Posts
        </h1>
        <p className="mt-2 text-slate-400">
          Discover the latest news, updates, and articles.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 py-20 text-slate-400">
          <p className="text-lg font-medium text-slate-300">No posts found</p>
          <p className="text-sm">Check back later for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
