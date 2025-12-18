const Hero = () => {
  return (
    <section
      className="relative min-h-[65vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center text-white px-4 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Write. Share. Inspire.
        </h1>
        <p className="text-lg sm:text-xl text-gray-200">
          A place for thoughtful writing, honest ideas, and meaningful stories.
        </p>
      </div>
    </section>
  );
};

export default Hero;
