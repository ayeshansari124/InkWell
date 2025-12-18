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
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:4000/author/${id}`)
      .then(res => res.json())
      .then(data => {
        setAuthor(data.user);
        setFollowers(data.postCount);
      });

    fetch(`http://localhost:4000/author/${id}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [id]);

  const toggleFollow = async () => {
    const res = await fetch(
      `http://localhost:4000/author/${id}/follow`,
      { method: "POST", credentials: "include" }
    );
    const data = await res.json();
    setFollowers(data.followers);
  };

  if (!author) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      
      {/* AUTHOR HEADER */}
      <div className="flex gap-6 items-center border-b pb-6">
        <img
          src={
            author.avatar
              ? `http://localhost:4000/${author.avatar}`
              : "https://ui-avatars.com/api/?name=" + author.name
          }
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{author.name}</h1>
          <p className="text-gray-600 mt-1">
            {author.bio || "No bio yet."}
          </p>
          
          <div className="flex gap-6 mt-3 text-sm text-gray-500">
            <span>{posts.length} posts</span>
            <span>{followers} followers</span>
          </div>
          {user && user._id === id && (
  <Link
    to="/profile/edit"
    className="text-sm border px-4 py-1 rounded-full"
  >
    Edit Profile
  </Link>
)}

        </div>

        {user && user._id !== id && (
          <button
            onClick={toggleFollow}
            className="bg-black text-white px-5 py-2 rounded-full"
          >
            Follow
          </button>
        )}
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
