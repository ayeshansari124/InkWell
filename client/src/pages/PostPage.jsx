import { useEffect, useState, useContext } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import { Pencil, Trash2, CalendarDays, AlertTriangle, X } from "lucide-react";

import { UserContext } from "../context/UserContext";

import { getPostById, deletePost } from "../services/post.service";

const PostPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [postInfo, setPostInfo] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getPostById(id).then(setPostInfo);
  }, [id]);

  const handleDelete = async () => {
    await deletePost(id);

    navigate("/");
  };

  if (!postInfo) return null;

  return (
    <>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
              <Link
                to={`/author/${postInfo.author?._id}`}
                className="font-semibold text-gray-800 hover:text-black hover:underline transition"
              >
                {postInfo.author?.name}
              </Link>

              <span>•</span>

              <div className="flex items-center gap-1">
                <CalendarDays size={14} />

                {new Date(postInfo.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[#0f172a] mb-4">
              {postInfo.title}
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-7 max-w-3xl">
              {postInfo.summary}
            </p>
          </div>

          {user?._id === postInfo.author?._id && (
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to={`/edit/${id}`}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <Pencil size={18} />
              </Link>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-10 h-10 rounded-xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </header>

        <div className="mb-8 overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
          <img
            src={`${import.meta.env.VITE_API_URL}/${postInfo.cover}`}
            alt={postInfo.title}
            className="w-full h-[240px] sm:h-[380px] object-cover"
          />
        </div>

        <section
          className="prose prose-lg max-w-none prose-headings:text-[#0f172a] prose-p:text-gray-700 prose-p:leading-8 prose-img:rounded-2xl prose-a:text-black"
          dangerouslySetInnerHTML={{
            __html: postInfo.content,
          }}
        />
      </article>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in">
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={26} />
              </div>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
              >
                <X size={18} />
              </button>
            </div>

            <h2 className="text-2xl font-black text-[#0f172a] mb-2">
              Delete Post?
            </h2>

            <p className="text-gray-600 leading-7">
              This action cannot be undone. Your article will be permanently
              removed.
            </p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;