import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
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
  "indent",
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
    fetch("http://localhost:4000/post/" + id)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((post) => {
        setTitle(post.title);
        setSummary(post.summary);
        setContent(post.content);
        setLoading(false);
      })
      .catch(() => {
        navigate("/");
      });
  }, [id, navigate]);

  const updatePost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);

    if (files) {
      data.append("file", files[0]);
    }

    const response = await fetch(
      "http://localhost:4000/post/" + id,
      {
        method: "PUT",
        body: data,
        credentials: "include",
      }
    );

    if (response.ok) {
      navigate("/post/" + id);
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Edit Post
        </h1>
        <p className="text-gray-500 mt-1">
          Update your blog post content
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={updatePost}
        className="
          bg-white
          border border-gray-200
          rounded-xl
          p-5 sm:p-8
          space-y-6
        "
      >
        {/* TITLE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full
              border border-gray-300
              rounded-lg
              px-4 py-2
              focus:outline-none
              focus:ring-2 focus:ring-black/20
            "
            required
          />
        </div>

        {/* SUMMARY */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Summary
          </label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="
              w-full
              border border-gray-300
              rounded-lg
              px-4 py-2
              focus:outline-none
              focus:ring-2 focus:ring-black/20
            "
            required
          />
        </div>

        {/* IMAGE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Replace Cover Image (optional)
          </label>
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            className="text-sm text-gray-600"
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Content
          </label>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              className="bg-white"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="
              bg-black text-white
              px-6 py-2
              rounded-lg
              text-sm font-medium
              hover:bg-black/90
              transition
            "
          >
            Update Post
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              border border-gray-300
              px-6 py-2
              rounded-lg
              text-sm
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
