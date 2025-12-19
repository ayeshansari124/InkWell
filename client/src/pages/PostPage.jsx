import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Pencil, Trash2 } from "lucide-react";

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

      {/* HEADER */}
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-3">
            {postInfo.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-700">
              {postInfo.author?.name || "Unknown Author"}
            </span>
            <span>·</span>
            <time>
              {new Date(postInfo.createdAt).toDateString()}
            </time>
          </div>
        </div>

        {/* ICON ACTIONS (AUTHOR ONLY) */}
        {user && user._id === postInfo.author?._id && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${postInfo._id}`}
              title="Edit post"
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Pencil size={18} />
            </Link>

            <button
              onClick={handleDelete}
              title="Delete post"
              className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* COVER IMAGE */}
      <div className="mb-10">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
          className="w-full max-h-[420px] object-cover rounded-2xl"
        />
      </div>

      {/* SUMMARY */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
          Summary
        </h2>

        <div className="bg-gray-50 border-l-4 border-black p-5 rounded-lg">
          <p className="text-lg font-medium text-gray-800 leading-relaxed">
            {postInfo.summary}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
          Content
        </h2>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </section>

    </article>
  );
};

export default PostPage;
