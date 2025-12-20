import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/post.service";

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

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    if (!files) return;

    const ok = await createPost({
      title,
      summary,
      content,
      file: files[0],
    });

    if (ok) navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Create New Post
        </h1>
        <p className="text-gray-500 mt-1">
          Write and publish a new blog post
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={createNewPost}
        className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 space-y-6"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Short summary"
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          required
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />

        <button className="bg-black text-white px-6 py-2 rounded-lg">
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
