"use client";

export default function SteelScroll() {
  return (
    <section
      id="steel-scroll-section"
      className="relative w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero2.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-[1]" />

      {/* Bottom Content */}
      <div className="absolute bottom-10 left-0 right-0 z-10 px-6 md:px-16 flex items-end justify-between">

        {/* Title */}
        <h2 className="font-heading text-3xl md:text-6xl text-white font-bold leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-2xl">
          Building India&apos;s Future.
        </h2>

        {/* Button */}
        <button className="px-6 py-3 bg-accent-yellow text-black font-bold text-xs md:text-sm uppercase tracking-wider rounded-sm shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:scale-105 transition duration-300">
          Explore Our Products
        </button>

      </div>
    </section>
  );
}
