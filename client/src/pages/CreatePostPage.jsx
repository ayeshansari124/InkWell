import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

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

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();

    if (!files) return;

    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("file", files[0]);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      
      {/* PAGE HEADER */}
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
            placeholder="Post title"
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
            placeholder="Short summary of the post"
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
            Cover Image
          </label>
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            className="block text-sm text-gray-600"
            required
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

        {/* ACTION */}
        <div className="pt-4">
          <button
            type="submit"
            className="
              inline-flex items-center justify-center
              bg-black text-white
              px-6 py-2
              rounded-lg
              text-sm font-medium
              hover:bg-black/90
              transition
            "
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
