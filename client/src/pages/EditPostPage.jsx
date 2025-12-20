import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getPostById, updatePost } from "../services/post.service";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostById(id)
      .then((post) => {
        setTitle(post.title);
        setSummary(post.summary);
        setContent(post.content);
        setLoading(false);
      })
      .catch(() => navigate("/"));
  }, [id, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const ok = await updatePost(id, {
      title,
      summary,
      content,
      file: files?.[0],
    });

    if (ok) navigate(`/post/${id}`);
  };

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Edit Post
        </h1>
        <p className="text-gray-500 mt-1">
          Update your blog post content
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 space-y-6"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          className="text-sm"
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />

        <div className="flex gap-3">
          <button className="bg-black text-white px-6 py-2 rounded-lg">
            Update Post
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
