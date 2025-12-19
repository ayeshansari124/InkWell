import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const AuthorPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:4000/author/${id}`)
      .then(res => res.json())
      .then(data => {
  setAuthor(data.user);
  setFollowerCount(data.followerCount);
  setIsFollowing(
    data.user.followers?.includes(user?._id)
  );
});

    fetch(`http://localhost:4000/author/${id}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [id]);

const toggleFollow = async () => {
  const res = await fetch(
    `http://localhost:4000/author/${id}/follow`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) return;

  const data = await res.json();
  setFollowerCount(data.followers);
  setIsFollowing(data.following);
};



  if (!author) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      
     {/* AUTHOR PROFILE CARD */}
<div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
  
  {/* TOP ROW */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
    
    {/* AVATAR */}
    <img
      src={
        author.avatar
          ? `http://localhost:4000/${author.avatar}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              author.name
            )}&background=000000&color=ffffff`
      }
      className="w-28 h-28 rounded-full object-cover border"
    />

    {/* MAIN INFO */}
    <div className="flex-1 space-y-3">
      <h1 className="text-4xl font-bold tracking-tight">
        {author.name}
      </h1>

      <p className="text-gray-600 max-w-xl leading-relaxed">
        {author.bio || "This author hasn’t written a bio yet."}
      </p>

      {/* STATS */}
      <div className="flex gap-8 text-sm pt-2">
        <div>
          <span className="font-semibold text-gray-900">
            {posts.length}
          </span>{" "}
          <span className="text-gray-500">Posts</span>
        </div>
        <div>
          <span className="font-semibold text-gray-900">
            {followerCount}
          </span>{" "}
          <span className="text-gray-500">Followers</span>
        </div>
      </div>
    </div>

    {/* ACTION */}
    <div className="pt-2 sm:pt-0">
      {user && user._id === id ? (
        <Link
  to="/profile/edit"
  className="
  bg-black text-white
  px-5 py-3
  rounded-lg
  text-base font-medium
  hover:bg-black/90
  transition
"

>
  Edit Profile
</Link>

      ) : (
       <button
  onClick={toggleFollow}
  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-black/90 transition"
>
  {isFollowing ? "Unfollow" : "Follow"}
</button>

      )}
    </div>
  </div>
</div>



      {/* POSTS */}
      <div className="space-y-6">
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default AuthorPage;
