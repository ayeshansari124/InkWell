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
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={updateProfile}
        className="space-y-6 bg-white border rounded-xl p-6"
      >
        {/* AVATAR */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <img
              src={
                user.avatar
                  ? `http://localhost:4000/${user.avatar}`
                  : "https://ui-avatars.com/api/?name=" + user.name
              }
              className="w-20 h-20 rounded-full object-cover"
            />
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
        </div>

        {/* BIO */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell something about yourself"
            className="w-full border border-gray-300 rounded p-3 resize-none"
          />
        </div>

        {/* ACTION */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
