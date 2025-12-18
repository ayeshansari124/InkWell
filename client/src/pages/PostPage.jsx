import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id)
      .then((response) => response.json())
      .then((postInfo) => setPostInfo(postInfo));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    const res = await fetch(
      "http://localhost:4000/post/" + postInfo._id,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (res.ok) {
      navigate("/");
    } else {
      alert("Failed to delete post");
    }
  };

  if (!postInfo) return null;

  return (
    <article className="max-w-4xl mx-auto px-6 py-10">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold leading-tight mb-4">
        {postInfo.title}
      </h1>

      {/* META */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span className="font-medium text-gray-700">
          {postInfo.author?.name || "Unknown Author"}
        </span>
        <span>·</span>
        <time>
          {new Date(postInfo.createdAt).toDateString()}
        </time>
      </div>

      {/* EDIT / DELETE (AUTHOR ONLY) */}
      {user && user._id === postInfo.author?._id && (
        <div className="flex gap-4 mb-6">
          <Link
            to={`/edit/${postInfo._id}`}
            className="text-sm bg-black text-white px-4 py-1 rounded"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="text-sm bg-red-600 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}

      {/* COVER IMAGE */}
      <div className="mb-8">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
          className="w-full max-h-[420px] object-cover rounded-xl"
        />
      </div>

      {/* SUMMARY */}
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        {postInfo.summary}
      </p>

      {/* CONTENT */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </article>
  );
};

export default PostPage;
