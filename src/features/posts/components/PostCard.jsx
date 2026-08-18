import { Link } from "react-router";
import { Calendar, User } from "lucide-react";

const PostCard = ({ post }) => {
  const excerpt =
    post.content.length > 150
      ? post.content.slice(0, 150).trim() + "..."
      : post.content;

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      to={`/posts/${post._id}`}
      className="group flex flex-col rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500/10"
    >
      <h2 className="text-xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-indigo-400">
        {post.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{excerpt}</p>

      <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500">
        {post.author?.name && (
          <span className="flex items-center gap-1.5">
            <User size={14} className="text-slate-400" />
            {post.author.name}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Calendar size={14} className="text-slate-400" />
          {formattedDate}
        </span>
      </div>
    </Link>
  );
};

export default PostCard;
