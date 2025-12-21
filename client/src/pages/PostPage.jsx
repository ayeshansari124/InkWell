import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { UserContext } from "../context/UserContext";
import { getPostById, deletePost } from "../services/post.service";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    getPostById(id).then(setPostInfo);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    await deletePost(id);
    navigate("/");
  };

  if (!postInfo) return null;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8 flex justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-3">
            {postInfo.title}
          </h1>
          <div className="text-sm text-gray-500">
            <Link
              to={`/author/${postInfo.author?._id}`}
              className="font-medium hover:underline"
            >
              {postInfo.author?.name}
            </Link>{" "}
            · {new Date(postInfo.createdAt).toDateString()}
          </div>
        </div>

        {user?._id === postInfo.author?._id && (
          <div className="flex gap-2">
            <Link to={`/edit/${id}`} className="p-2 hover:bg-gray-100 rounded">
              <Pencil size={18} />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-50 text-red-600 rounded"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </header>

      <img
        src={`${import.meta.env.VITE_API_URL}/${postInfo.cover}`}
        alt={postInfo.title}
        className="w-full max-h-[420px] object-cover rounded-xl mb-8"
      />

      <section className="mb-10">
        <p className="text-sm uppercase text-gray-500 mb-2">Summary</p>
        <div className="bg-gray-50 border-l-4 border-black p-4 rounded-lg">
          {postInfo.summary}
        </div>
      </section>

      <section
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </article>
  );
};

export default PostPage;
