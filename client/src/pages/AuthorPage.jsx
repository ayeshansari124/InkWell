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
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
    
    {/* AUTHOR PROFILE CARD */}
    <section className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">

        {/* AVATAR */}
        <div className="flex-shrink-0">
          <img
            src={
              author.avatar
                ? `http://localhost:4000/${author.avatar}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    author.name
                  )}&background=000000&color=ffffff`
            }
            alt={author.name}
            className="
              w-24 h-24
              sm:w-28 sm:h-28
              rounded-full
              object-cover
              border
            "
          />
        </div>

        {/* INFO */}
        <div className="flex-1 space-y-4">
          {/* NAME */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {author.name}
          </h1>

          {/* BIO */}
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            {author.bio || "This author hasn’t written a bio yet."}
          </p>

          {/* STATS */}
          <div className="flex gap-6 text-sm text-gray-600">
            <span>
              <strong className="text-gray-900">{posts.length}</strong>{" "}
              Posts
            </span>
            <span>
              <strong className="text-gray-900">{followerCount}</strong>{" "}
              Followers
            </span>
          </div>

          {/* ACTION */}
          <div className="pt-2">
            {user && user._id === id ? (
              <Link
                to="/profile/edit"
                className="
                  inline-flex items-center
                  px-5 py-2
                  text-sm font-medium
                  bg-black text-white
                  rounded-lg
                  hover:bg-black/90
                  transition
                "
              >
                Edit Profile
              </Link>
            ) : (
              <button
                onClick={toggleFollow}
                className="
                  inline-flex items-center
                  px-6 py-2
                  text-sm font-medium
                  bg-black text-white
                  rounded-lg
                  hover:bg-black/90
                  transition
                "
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* POSTS */}
    <section className="space-y-6">
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </section>
  </div>
); 
};

export default AuthorPage;
