const Hero = () => {
  return (
    <section
      className="relative overflow-hidden min-h-[65vh] lg:min-h-[80vh] flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/65" />

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white">
            Write Stories
            <br />
            <span className="text-gray-300">That Matter.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl">
            Discover thoughtful writing, publish your ideas, and connect with
            readers through meaningful stories and powerful perspectives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
