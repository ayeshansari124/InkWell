import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Post from "../components/Post";
import { getAllPosts } from "../services/post.service";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <>
      <Hero />
      <main className="bg-white">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6 sm:space-y-8">
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post._id} {...post} />)
          ) : (
            <p className="text-center text-gray-500">No posts yet.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default IndexPage;
