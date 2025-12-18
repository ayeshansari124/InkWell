import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((res) => res.json())
      .then((posts) => setPosts(posts));
  }, []);

  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {posts.length > 0 &&
          posts.map((post) => <Post key={post._id} {...post} />)}
      </section>
    </>
  );
};

export default IndexPage;
