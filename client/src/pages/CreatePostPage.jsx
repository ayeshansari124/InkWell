import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import { useNavigate } from "react-router-dom";

import { ImagePlus, PenSquare, FileText } from "lucide-react";

import { createPost } from "../services/post.service";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
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
    <div className="min-h-screen bg-[#fafafa] py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0f172a] leading-tight">
            Create New Post
          </h1>

          <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-2xl">
            Share your ideas, thoughts, experiences, and stories with the world.
          </p>
        </div>

        <form
          onSubmit={createNewPost}
          className="bg-white border border-gray-200 rounded-[28px] shadow-sm overflow-hidden"
        >
          <div className="p-5 sm:p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <PenSquare size={16} />
                Post Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-lg font-semibold outline-none focus:border-black focus:bg-white transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText size={16} />
                Short Summary
              </label>

              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write a short summary of your article..."
                rows={3}
                className="w-full resize-none bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-black focus:bg-white transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ImagePlus size={16} />
                Cover Image
              </label>

              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-2xl py-10 px-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer text-center">
                <ImagePlus size={28} className="text-gray-500" />

                <div>
                  <p className="font-semibold text-gray-800">
                    Upload Cover Image
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, JPEG supported
                  </p>
                </div>

                <input
                  type="file"
                  onChange={(e) => setFiles(e.target.files)}
                  className="hidden"
                  required
                />
              </label>

              {files?.[0] && (
                <p className="text-sm text-gray-600 font-medium">
                  Selected: {files[0].name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Post Content
              </label>

              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  className="min-h-[320px]"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-gray-50 px-5 sm:px-8 py-5 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;