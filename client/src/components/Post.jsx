import { Link } from "react-router-dom";

const Post = ({ title, summary, cover, author, createdAt, _id }) => {
  return (
    <div className="flex gap-6 py-6 border-b border-gray-200 min-h-[160px] w-full">
      
      <Link to={`/post/${_id}`}>
      <img
        src={"http://localhost:4000/" + cover}
        alt={title}
        className="w-80 h-48 object-cover rounded-md flex-shrink-0"
      />
      </Link>
      

      {/* CONTENT */}
      <div className="flex flex-col gap-2">

        <Link to={`/post/${_id}`}>
        <h2 className="text-2xl font-bold leading-snug">
          {title}
        </h2>

        </Link>
        
        {/* AUTHOR + DATE */}
        <span className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            {author?.name || "Unknown Author"}
          </span>
          {" · "}
          <time> {new Date(createdAt).toLocaleDateString()}</time>
        </span>

        <p className="text-sm text-gray-700 leading-relaxed">
          {summary}
        </p>

      </div>
    </div>
  );
};

export default Post;
