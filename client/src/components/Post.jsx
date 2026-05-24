import { useNavigate } from "react-router-dom";

import { CalendarDays, ArrowUpRight } from "lucide-react";

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
      className="group cursor-pointer bg-white border border-gray-200 rounded-[32px] overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row">
        {/* ================= IMAGE ================= */}
        <div className="relative w-full lg:w-[340px] xl:w-[380px] h-[240px] lg:h-auto shrink-0 overflow-hidden bg-gray-100">
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* META */}
            <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/author/${author?._id}`);
                }}
                className="font-bold text-slate-800 hover:text-black transition"
              >
                {author?.name}
              </button>

              <span className="w-1 h-1 rounded-full bg-gray-300"></span>

              <div className="flex items-center gap-1.5 text-gray-500">
                <CalendarDays size={14} />

                <span>{formattedDate}</span>
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-2xl sm:text-3xl font-black leading-[1.15] tracking-tight text-slate-900 line-clamp-2 group-hover:text-black transition">
              {title}
            </h2>

            {/* SUMMARY */}
            <p className="mt-5 text-gray-600 text-[15px] sm:text-base leading-8 line-clamp-4 max-w-4xl">
              {summary}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-black group-hover:gap-3 transition-all">
              Read Full Article
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
