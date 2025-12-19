import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(null);

  if (!user) return null;

  const updateProfile = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("bio", bio);
    if (avatar) data.append("avatar", avatar);

    const res = await fetch("http://localhost:4000/profile", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (res.ok) {
      const updated = await res.json();
      setUser(updated.user);
      navigate(`/author/${user._id}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Edit Profile
        </h1>
        <p className="text-gray-500 mt-1">
          Update your public profile information
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={updateProfile}
        className="
          bg-white
          border border-gray-200
          rounded-xl
          p-5 sm:p-6
          space-y-6
        "
      >
        {/* AVATAR */}
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
              className="
                w-20 h-20
                rounded-full
                object-cover
                border
              "
            />

            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="text-sm text-gray-600"
            />
          </div>
        </div>

        {/* BIO */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell something about yourself"
            className="
              w-full
              border border-gray-300
              rounded-lg
              px-4 py-2
              resize-none
              focus:outline-none
              focus:ring-2 focus:ring-black/20
            "
          />
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
