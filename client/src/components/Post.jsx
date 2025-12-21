import { useNavigate } from "react-router-dom";

const Post = ({ title, summary, cover, author, createdAt, _id }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/post/${_id}`)}
      className="cursor-pointer border-b py-6 hover:shadow-sm"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={`${process.env.VITE_API_URL}/${cover}`}
          alt={title}
          className="w-full sm:w-72 h-48 object-cover rounded-lg"
        />

        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="text-sm text-gray-500">
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/author/${author?._id}`);
              }}
              className="font-medium hover:underline"
            >
              {author?.name}
            </span>
            {" · "}
            {new Date(createdAt).toLocaleDateString()}
          </div>
          <p className="text-gray-700 mt-2 line-clamp-3">{summary}</p>
        </div>
      </div>
    </article>
  );
};

export default Post;
