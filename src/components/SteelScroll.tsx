"use client";

export default function SteelScroll() {
    return (
        <div
            id="steel-scroll-section"
            className="relative h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] w-full bg-transparent overflow-hidden flex items-center justify-center"
        >
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/hero2.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 z-[1]" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pointer-events-none">
                <div className="absolute bottom-32 text-center max-w-4xl px-4 flex flex-col items-center pointer-events-auto">
                    <h2 className="font-heading text-5xl md:text-7xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-grey">
                        Building India&apos;s Future.
                    </h2>

                    <button className="mt-12 px-8 py-4 bg-accent-yellow text-black font-body font-bold text-sm md:text-lg uppercase tracking-wider rounded-sm shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                        Explore Our Products
                    </button>
                </div>
            </div>
        </div>
    );
}
