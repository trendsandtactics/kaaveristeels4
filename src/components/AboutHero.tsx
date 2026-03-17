"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function AboutHero() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5, // 50% visible
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!videoRef.current) return;

        if (isVisible) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isVisible]);

    return (
        <div ref={containerRef} className="w-full bg-white">
            {/* Hero Background Section */}
            <div className="relative w-full pt-32 pb-20 overflow-hidden shadow-sm">

                {/* 🎥 VIDEO BACKGROUND */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/video/about.mp4" // 👈 your video path
                    muted
                    loop
                    playsInline
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 z-[1]" />

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="font-body text-white uppercase tracking-[0.2em] font-bold text-sm mb-4">
                            About Us
                        </h2>

                        <h1 className="font-heading text-5xl md:text-7xl text-white mb-8 leading-tight font-extrabold">
                            Welcome to KAAVERI <br />
                            <span className="text-4xl md:text-5xl block mt-2">
                                TMT & STRUCTURAL
                            </span>
                        </h1>

                        <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed font-medium">
                            At KAAVERI, we are passionate about steel and dedicated to excellence.
                        </p>
                    </div>
                </div>
            </div>

            {/* BELOW CONTENT (same as your code, unchanged) */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10 bg-white">
                {/* Mission Section */}
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-24">
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] rounded-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-accent-red/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                        <Image
                            src="/image/about1.png"
                            alt="Industrial Teamwork"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="font-body text-black uppercase tracking-[0.2em] font-bold text-sm mb-4">Our Mission</h2>
                        <h3 className="font-heading text-4xl md:text-5xl text-black mb-6 font-extrabold">
                            Building a Stronger, Sustainable Future
                        </h3>
                        <p className="font-body text-black/80 text-lg leading-relaxed font-medium">
                            Your mission content...
                        </p>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] rounded-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-accent-yellow/20 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                        <Image
                            src="/image/about2.png"
                            alt="Industrial Factory"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="font-body text-black uppercase tracking-[0.2em] font-bold text-sm mb-4">Vision</h2>
                        <h3 className="font-heading text-4xl md:text-5xl text-black mb-6 font-extrabold">
                            Leading the Steel Industry with Quality, Innovation, and Trust
                        </h3>
                        <p className="font-body text-black/80 text-lg leading-relaxed font-medium">
                            Your vision content...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
