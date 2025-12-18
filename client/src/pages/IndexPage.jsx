import Post from '../components/Post'
import Hero from '../components/Hero'
import { useEffect, useState } from 'react'

const IndexPage = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/post").then(response => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
  
  }, [])
  
  
  return (
    <div>

      <Hero />
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {posts.length > 0 && posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </section>

    </div>
  )
}

export default IndexPage
