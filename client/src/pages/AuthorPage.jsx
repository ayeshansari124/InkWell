import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { CalendarDays, Users, FileText, Pencil } from "lucide-react";

import Post from "../components/Post";

import { UserContext } from "../context/UserContext";

import {
  getAuthorById,
  getAuthorPosts,
  toggleFollowAuthor,
} from "../services/author.service";

const AuthorPage = () => {
  const { id } = useParams();

  const { user } = useContext(UserContext);

  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    getAuthorById(id).then((data) => {
      setAuthor(data.user);
      setFollowerCount(data.followerCount);
      setIsFollowing(data.user.followers?.includes(user?._id));
    });

    getAuthorPosts(id).then(setPosts);
  }, [id, user]);

  const toggleFollow = async () => {
    const data = await toggleFollowAuthor(id);

    if (!data) return;

    setFollowerCount(data.followers);
    setIsFollowing(data.following);
  };

  if (!author) return null;

  const joinedDate = author.createdAt
    ? new Date(author.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <section className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white">
        <div className="h-32 sm:h-40 bg-gradient-to-r from-black via-gray-900 to-slate-800" />

        <div className="px-5 sm:px-8 pb-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 -mt-14">
            <div className="shrink-0">
              <img
                src={
                  author.avatar
                    ? author.avatar
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=000000&color=ffffff`
                }
                alt={author.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] object-cover border-4 border-white shadow-xl bg-white"
              />
            </div>

            <div className="flex-1 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl sm:text-4xl font-white tracking-tight text-gray-900 sm:text-white">
                      {author.name}
                    </h1>

                    {user && user._id === id && (
                      <Link
                        to="/profile/edit"
                        className="text-gray-500 hover:text-black transition"
                      >
                        <Pencil size={20} />
                      </Link>
                    )}
                  </div>

                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {author.bio || "This author hasn’t written a bio yet."}
                  </p>
                </div>

                {user && user._id !== id && (
                  <button
                    onClick={toggleFollow}
                    className="shrink-0 px-5 py-2.5 rounded-2xl bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-7">
                <div className="flex items-center gap-3 rounded-2xl px-4 py-4">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Posts</p>

                    <h3 className="text-lg font-bold text-gray-900">
                      {posts.length}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl px-4 py-4">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <Users size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Followers</p>

                    <h3 className="text-lg font-bold text-gray-900">
                      {followerCount}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl px-4 py-4 col-span-2 md:col-span-1">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Joined</p>

                    <h3 className="text-lg font-bold text-gray-900">
                      {joinedDate}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900">
            Published Articles
          </h2>

          <p className="text-gray-500 mt-1">
            Stories and writings by {author.name}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post._id} {...post} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-14 text-center">
            <h3 className="text-xl font-bold text-gray-900">No Posts Yet</h3>

            <p className="text-gray-500 mt-2">
              This author hasn’t published anything yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AuthorPage;