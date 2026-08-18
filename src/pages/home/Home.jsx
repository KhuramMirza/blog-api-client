import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

import { getPosts } from "../../features/posts/api/getPosts.js";

import PostCard from "../../features/posts/components/PostCard.jsx";

const LIMIT = 10;

const SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest first" },
  { value: "createdAt", label: "Oldest first" },
  { value: "title", label: "Title (A–Z)" },
  { value: "-title", label: "Title (Z–A)" },
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "-createdAt";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", { page, sort }],
    queryFn: () => getPosts({ page, limit: LIMIT, sort }),
    keepPreviousData: true,
  });

  const goToPage = (newPage) => {
    setSearchParams({ page: String(newPage), sort });
  };

  const changeSort = (newSort) => {
    setSearchParams({ page: "1", sort: newSort });
  };

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
  const hasNextPage = posts.length === LIMIT;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Latest Posts
          </h1>
          <p className="mt-2 text-slate-400">
            Discover the latest news, updates, and articles.
          </p>
        </div>

        <div className="relative w-full sm:w-56">
          <ArrowUpDown
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
          />
          <select
            value={sort}
            onChange={(e) => changeSort(e.target.value)}
            className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800 py-2 pr-4 pl-9 text-sm text-slate-100 focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 py-20 text-slate-400">
          <p className="text-lg font-medium text-slate-300">No posts found</p>
          <p className="text-sm">Check back later for new content.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="min-w-20 text-center text-sm font-medium text-slate-400">
              Page {page}
            </span>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={!hasNextPage}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
