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
      .then((res) => res.json())
      .then((post) => setPostInfo(post));
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
    }
  };

  if (!postInfo) return null;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* HEADER */}
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">
              {postInfo.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link
                to={`/author/${postInfo.author?._id}`}
                className="font-medium text-gray-700 hover:underline"
              >
                {postInfo.author?.name}
              </Link>
              <span>·</span>
              <time>
                {new Date(postInfo.createdAt).toDateString()}
              </time>
            </div>
          </div>

          {/* ACTIONS */}
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
      </header>

      {/* COVER IMAGE */}
      <div className="mb-8">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
          className="w-full max-h-[420px] object-cover rounded-xl"
        />
      </div>

      {/* SUMMARY */}
      <section className="mb-10">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Summary
        </p>

        <div className="bg-gray-50 border-l-4 border-black p-4 sm:p-5 rounded-lg">
          <p className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed">
            {postInfo.summary}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">
          Content
        </p>

        <div
          className="prose prose-base sm:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </section>

    </article>
  );
};

export default PostPage;
