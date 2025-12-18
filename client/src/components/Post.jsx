import { Link } from "react-router-dom";

const Post = ({ title, summary, cover, author, createdAt, _id }) => {
  return (
    <Link
      to={`/post/${_id}`}
      className="
        block
        border-b border-gray-200
        transition-all duration-200 ease-out
        hover:-translate-y-[2px]
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-black
      "
    >
      <article className="flex gap-6 py-6 w-full group">
        
        {/* IMAGE */}
        <div className="w-72 h-44 overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
          <img
            src={"http://localhost:4000/" + cover}
            alt={title}
            className="
              w-full h-full object-cover
              transition-transform duration-300 ease-out
              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between py-1 flex-1">
          <div className="space-y-2">

            {/* TITLE */}
            <h2 className="text-xl font-bold leading-snug line-clamp-2">
              {title}
            </h2>

            {/* META */}
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                {author?.name || "Unknown Author"}
              </span>
              {" · "}
              <time>{new Date(createdAt).toLocaleDateString()}</time>
            </div>

            {/* SUMMARY */}
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
              {summary}
            </p>
          </div>
        </div>

      </article>
    </Link>
  );
};

export default Post;
