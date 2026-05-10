import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import { PenSquare, FileText, ImagePlus, ArrowLeft } from "lucide-react";

import { getPostById, updatePost } from "../services/post.service";

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
    <div className="min-h-screen bg-[#fafafa] py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0f172a] leading-tight">
              Edit Post
            </h1>

            <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-2xl">
              Update your article and improve your content before publishing.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition"
          >
            <ArrowLeft size={16} />

            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        <form
          onSubmit={onSubmit}
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
                placeholder="Write a short summary..."
                rows={3}
                className="w-full resize-none bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-black focus:bg-white transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ImagePlus size={16} />
                Update Cover Image
              </label>

              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-2xl py-10 px-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer text-center">
                <ImagePlus size={28} className="text-gray-500" />

                <div>
                  <p className="font-semibold text-gray-800">
                    Upload New Image
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty to keep current image
                  </p>
                </div>

                <input
                  type="file"
                  onChange={(e) => setFiles(e.target.files)}
                  className="hidden"
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

          <div className="border-t border-gray-100 bg-gray-50 px-5 sm:px-8 py-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="sm:hidden px-5 py-3 rounded-2xl border border-gray-200 bg-white font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="ml-auto px-6 sm:px-8 py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;