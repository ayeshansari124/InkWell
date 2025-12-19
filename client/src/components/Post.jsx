import { useNavigate } from "react-router-dom";

const Post = ({ title, summary, cover, author, createdAt, _id }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/post/${_id}`)}
      className="
        group
        cursor-pointer
        border-b border-gray-200
        transition-all duration-200 ease-out
        hover:-translate-y-[2px]
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
        focus-within:ring-2 focus-within:ring-black
      "
    >
      <div
        className="
          flex flex-col
          sm:flex-row
          gap-4 sm:gap-6
          py-6
          w-full
        "
      >
        {/* IMAGE */}
        <div
          className="
            w-full
            sm:w-72
            h-48
            sm:h-44
            overflow-hidden
            rounded-lg
            bg-gray-100
            flex-shrink-0
          "
        >
          <img
            src={`http://localhost:4000/${cover}`}
            alt={title}
            className="
              w-full h-full object-cover
              transition-transform duration-300 ease-out
              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-2">
            {/* TITLE */}
            <h2 className="text-lg sm:text-xl font-bold leading-snug line-clamp-2">
              {title}
            </h2>

            {/* META */}
            <div className="text-sm text-gray-500 flex flex-wrap gap-1">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/author/${author?._id}`);
                }}
                className="font-medium text-gray-700 hover:underline cursor-pointer"
              >
                {author?.name || "Unknown"}
              </span>
              <span>·</span>
              <time>{new Date(createdAt).toLocaleDateString()}</time>
            </div>

            {/* SUMMARY */}
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
