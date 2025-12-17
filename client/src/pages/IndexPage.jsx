import React from 'react'
import Post from '../components/Post'
import Hero from '../components/Hero'

const IndexPage = () => {
  return (
    <div>

      <Hero />
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <Post />
        <Post />
        <Post />
      </section>

    </div>
  )
}

export default IndexPage
