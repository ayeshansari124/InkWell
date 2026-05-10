import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const Post = ({ title, summary, cover, author, createdAt, _id }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      onClick={() => navigate(`/post/${_id}`)}
      className="
        group
        cursor-pointer
        bg-white
        border border-gray-200
        rounded-2xl
        overflow-hidden
        hover:shadow-lg
        transition-all duration-300
      "
    >
      <div className="flex flex-col sm:flex-row">
        {/* IMAGE */}
        <div
          className="
            w-full
            sm:w-[240px]
            h-[200px]
            shrink-0
            overflow-hidden
            bg-gray-100
          "
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/${cover}`}
            alt={title}
            className="
              w-full
              h-full
              object-cover
              group-hover:scale-105
              transition-transform duration-500
            "
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            flex-1
            p-5
            flex flex-col
            justify-between
            min-h-[200px]
          "
        >
          <div>
            {/* META */}
            <div
              className="
                flex items-center
                gap-3
                text-sm
                text-gray-500
                mb-3
                flex-wrap
              "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/author/${author?._id}`);
                }}
                className="
                  font-semibold
                  text-gray-700
                  hover:text-black
                "
              >
                {author?.name}
              </button>

              <span className="text-gray-300">•</span>

              <div className="flex items-center gap-1">
                <CalendarDays size={14} />

                <span>{formattedDate}</span>
              </div>
            </div>

            {/* TITLE */}
            <h2
              className="
                text-2xl
                font-black
                leading-tight
                tracking-tight
                text-slate-900
                line-clamp-2
              "
            >
              {title}
            </h2>

            {/* SUMMARY */}
            <p
              className="
                mt-3
                text-gray-600
                text-sm
                leading-relaxed
                line-clamp-3
              "
            >
              {summary}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <span
              className="
                inline-flex items-center
                text-sm
                font-semibold
                text-black
                group-hover:translate-x-1
                transition-transform
              "
            >
              Read Full Article →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
