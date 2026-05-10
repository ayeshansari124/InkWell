import { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";

import { useNavigate } from "react-router-dom";

import { Camera, FileText, ArrowLeft } from "lucide-react";

import { updateProfile } from "../services/profile.service";

const EditProfilePage = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(null);

  if (!user) return null;

  const onSubmit = async (e) => {
    e.preventDefault();

    const updated = await updateProfile({
      bio,
      avatar,
    });

    if (!updated) return;

    setUser(updated.user);

    navigate(`/author/${user._id}`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 sm:py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0f172a]">
              Edit Profile
            </h1>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Update your public information and profile appearance.
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
          <div className="p-5 sm:p-8 space-y-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative w-fit">
                <img
                  src={
                    user.avatar
                      ? `${import.meta.env.VITE_API_URL}/${user.avatar}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name,
                        )}&background=000000&color=ffffff`
                  }
                  alt={user.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border border-gray-200 shadow-sm"
                />

                <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center cursor-pointer hover:scale-105 transition">
                  <Camera size={18} />

                  <input
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Display Name</p>

                  <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">
                    {user.name}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText size={16} />
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                placeholder="Tell readers something about yourself..."
                className="w-full resize-none bg-gray-50 border border-gray-200 rounded-3xl px-5 py-4 outline-none text-gray-800 focus:border-black focus:bg-white transition"
              />

              <p className="text-xs text-gray-400">
                Your bio will appear publicly on your author page.
              </p>
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
              className="ml-auto px-7 py-3 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;