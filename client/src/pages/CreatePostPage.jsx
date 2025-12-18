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

  const navigate = useNavigate(); // 🔑 THIS IS THE KEY

  const createNewPost = async (e) => {
    e.preventDefault();

    if (!files) {
      alert("Please select an image");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("file", files[0]);

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Post creation failed");
      }

      // ✅ SUCCESS → REDIRECT
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating the post");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
      <p className="text-gray-500 mb-8">
        Write and publish a new blog post
      </p>

      <form
        onSubmit={createNewPost}
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
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            required
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

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
