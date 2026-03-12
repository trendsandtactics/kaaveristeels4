"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function SteelScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            className="relative h-[400vh] w-full bg-black"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/sequence.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />

                <div className="absolute inset-0 bg-black/30 z-[1]" />

                <div className="absolute inset-0 pointer-events-none z-10">
                    <OverlayTexts scrollYProgress={scrollYProgress} />
                </div>
            </div>
        </div>
    );
}

function OverlayTexts({
    scrollYProgress,
}: {
    scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
    const text1Opacity = useTransform(scrollYProgress, [0.05, 0.1, 0.17, 0.23], [0, 1, 1, 0]);
    const text2Opacity = useTransform(scrollYProgress, [0.27, 0.33, 0.4, 0.47], [0, 1, 1, 0]);
    const text3Opacity = useTransform(scrollYProgress, [0.53, 0.58, 0.67, 0.73], [0, 1, 1, 0]);

    const text4Opacity = useTransform(
        scrollYProgress,
        [0, 0.03, 0.8, 0.88, 1],
        [1, 0, 0, 1, 1]
    );

    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-end relative">
            <motion.div
                style={{ opacity: text1Opacity }}
                className="absolute bottom-32 text-center max-w-4xl px-4 flex flex-col items-center"
            >
                <h2 className="font-heading text-4xl md:text-6xl text-white/90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-tight">
                    Strength Begins
                    <br /> at the Core.
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: text2Opacity }}
                className="absolute bottom-32 text-center max-w-4xl px-4 flex flex-col items-center"
            >
                <h2 className="font-heading text-4xl md:text-6xl text-white/90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-tight">
                    <span className="text-accent-orange">Refined in Fire.</span>
                    <br /> Engineered for Endurance.
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: text3Opacity }}
                className="absolute bottom-32 text-center max-w-4xl px-4 flex flex-col items-center"
            >
                <h2 className="font-heading text-4xl md:text-6xl text-white/90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-tight">
                    Precision Rolled.
                    <br /> <span className="text-accent-grey">Quality Assured.</span>
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: text4Opacity }}
                className="absolute bottom-32 text-center max-w-4xl px-4 flex flex-col items-center justify-center select-auto pointer-events-auto"
            >
                <h2 className="font-heading text-5xl md:text-7xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-grey">
                    Building India&apos;s Future.
                </h2>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 px-8 py-4 bg-accent-yellow text-black font-body font-bold text-sm md:text-lg uppercase tracking-wider rounded-sm shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-all"
                >
                    Explore Our Products
                </motion.button>
            </motion.div>

            <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-12 flex flex-col items-center text-white/50"
            >
                <span className="font-body text-xs tracking-[0.3em] uppercase mb-4">
                    Scroll to Discover
                </span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
                />
            </motion.div>
        </div>
    );
}
