import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/profile.service";

const EditProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(null);

  if (!user) return null;

  const onSubmit = async (e) => {
    e.preventDefault();

    const updated = await updateProfile({ bio, avatar });
    if (!updated) return;

    setUser(updated.user);
    navigate(`/author/${user._id}`);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Edit Profile
        </h1>
        <p className="text-gray-500 mt-1">
          Update your public profile information
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-6"
      >
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Profile Picture
          </label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              src={
                user.avatar
                  ? `http://localhost:4000/${user.avatar}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}&background=000000&color=ffffff`
              }
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border"
            />

            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="text-sm text-gray-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black/90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
