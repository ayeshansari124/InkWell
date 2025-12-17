import React from 'react'

const Hero = () => {
  return (
    <section
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Text content */}
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Write. Share. Inspire.
          </h1>
          <p className="text-lg text-gray-200">
            A place for thoughtful writing, honest ideas, and meaningful stories.
            Log in to publish your own.
          </p>
        </div>
      </section>
  )
}

export default Hero
