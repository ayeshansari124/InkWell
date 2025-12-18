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

  // 🔹 Fetch existing post
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
        alert("You are not allowed to edit this post");
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
    } else {
      alert("Failed to update post");
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
      <p className="text-gray-500 mb-8">
        Update your blog post content
      </p>

      <form
        onSubmit={updatePost}
        className="space-y-6 bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
      >
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* SUMMARY */}
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Replace Cover Image (optional)
          </label>
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
          >
            Update Post
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-gray-300 px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
