"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SteelCalculator() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "" });

    const [activeTab, setActiveTab] = useState<"construction" | "weight">("construction");

    // Construction State
    const [structureType, setStructureType] = useState("residential");
    const [area, setArea] = useState("");
    const [floors, setFloors] = useState("1");
    const [estimatedSteel, setEstimatedSteel] = useState<number | null>(null);

    // Weight State
    const [diameter, setDiameter] = useState("8");
    const [length, setLength] = useState("12");
    const [quantity, setQuantity] = useState("");
    const [estimatedWeight, setEstimatedWeight] = useState<number | null>(null);
    const [bundleCount, setBundleCount] = useState<number | null>(null);

    const calculateConstruction = () => {
        let multiplier = 4;

        if (structureType === "commercial") multiplier = 5;
        if (structureType === "infrastructure") multiplier = 6;

        const totalArea = Number(area) * Number(floors);

        if (totalArea > 0) {
            setEstimatedSteel(totalArea * multiplier);
        } else {
            setEstimatedSteel(null);
        }
    };

    const calculateWeight = () => {
        const d = Number(diameter);
        const l = Number(length);
        const q = Number(quantity);

        if (d > 0 && l > 0 && q > 0) {
            const weightPerBar = ((d * d) / 162) * l;
            const totalWeight = weightPerBar * q;
            setEstimatedWeight(totalWeight);

            const barsPerBundle = d <= 10 ? 10 : d <= 16 ? 5 : 3;
            setBundleCount(Math.ceil(q / barsPerBundle));
        } else {
            setEstimatedWeight(null);
            setBundleCount(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.name.trim() && formData.phone.trim()) {
            console.log("Lead captured:", formData);
            setIsUnlocked(true);
        }
    };

    if (!isUnlocked) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mx-auto w-full max-w-xl overflow-hidden rounded-sm border border-gray-100 bg-white shadow-2xl"
            >
                <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-accent-red/5 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-yellow/10 blur-3xl" />

                <div className="relative z-10 p-8 md:p-12">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent-red/20 bg-accent-red/5 shadow-sm">
                            <span className="text-2xl text-accent-red">🔒</span>
                        </div>

                        <h3 className="mb-4 font-heading text-3xl text-black md:text-4xl">
                            Access the <span className="text-accent-red">Calculator</span>
                        </h3>

                        <p className="mx-auto max-w-sm font-body font-medium text-black/60">
                            Enter your details to unlock our premium engineering suite and calculate your precise steel requirements.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2 text-left">
                            <label
                                htmlFor="name"
                                className="font-body text-xs font-bold uppercase tracking-widest text-black/80"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 font-body text-black outline-none transition-all focus:border-accent-red focus:ring-1 focus:ring-accent-red"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2 text-left">
                            <label
                                htmlFor="phone"
                                className="font-body text-xs font-bold uppercase tracking-widest text-black/80"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                required
                                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 font-body text-black outline-none transition-all focus:border-accent-red focus:ring-1 focus:ring-accent-red"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="group relative mt-4 w-full overflow-hidden border-2 border-accent-red bg-accent-red px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-accent-red">
                                Unlock Calculator
                            </span>
                            <div className="absolute inset-0 z-0 origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
                        </button>
                    </form>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)]"
        >
            {/* Top Branding Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-accent-red via-accent-yellow to-accent-red" />

            {/* Tabs */}
            <div className="flex w-full gap-2 border-b border-gray-100 bg-gray-50/50 p-2">
                <button
                    type="button"
                    className={`relative flex-1 rounded-xl px-6 py-4 text-center font-heading text-sm font-bold transition-all duration-300 sm:text-lg ${
                        activeTab === "construction"
                            ? "bg-white text-foreground shadow-sm ring-1 ring-gray-900/5"
                            : "text-gray-500 hover:bg-white/60 hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("construction")}
                >
                    Construction Steel
                </button>

                <button
                    type="button"
                    className={`relative flex-1 rounded-xl px-6 py-4 text-center font-heading text-sm font-bold transition-all duration-300 sm:text-lg ${
                        activeTab === "weight"
                            ? "bg-white text-foreground shadow-sm ring-1 ring-gray-900/5"
                            : "text-gray-500 hover:bg-white/60 hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("weight")}
                >
                    Weight & Bundle
                </button>
            </div>

            <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                    {activeTab === "construction" && (
                        <motion.div
                            key="construction"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-10"
                        >
                            <div className="mb-8 text-center md:text-left">
                                <h4 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                                    Estimate TMT Bar Requirement
                                </h4>
                                <p className="mt-2 font-body text-gray-500">
                                    Get an approximate steel estimate based on your construction area.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="group flex flex-col">
                                    <label className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-focus-within:text-foreground">
                                        Structure Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 p-4 font-medium text-foreground outline-none transition-all focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                                            value={structureType}
                                            onChange={(e) => setStructureType(e.target.value)}
                                        >
                                            <option value="residential">Residential Building</option>
                                            <option value="commercial">Commercial Complex</option>
                                            <option value="infrastructure">Infrastructure</option>
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                <div className="group flex flex-col">
                                    <label className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-focus-within:text-foreground">
                                        Built-up Area (sq. ft)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                                        placeholder="e.g. 1500"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                    />
                                </div>

                                <div className="group flex flex-col md:col-span-2">
                                    <label className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-focus-within:text-foreground">
                                        Number of Floors
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                                        placeholder="e.g. 2"
                                        value={floors}
                                        onChange={(e) => setFloors(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={calculateConstruction}
                                className="group relative w-full overflow-hidden rounded-xl bg-foreground py-5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.15)]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Calculate Requirement
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                            </button>

                            {estimatedSteel !== null && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="relative mt-12 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-10"
                                >
                                    <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-accent-yellow/10 blur-3xl mix-blend-multiply" />
                                    <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-red/5 blur-3xl mix-blend-multiply" />

                                    <div className="relative z-10 text-center">
                                        <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-foreground shadow-sm">
                                            Estimated Requirement
                                        </div>

                                        <div className="mb-4 font-heading text-6xl font-black tracking-tight text-foreground md:text-7xl">
                                            {estimatedSteel.toLocaleString()}{" "}
                                            <span className="font-body text-3xl font-normal text-gray-400">
                                                kg
                                            </span>
                                        </div>

                                        <div className="mx-auto mt-6 max-w-md border-t border-gray-200 pt-6 text-sm leading-relaxed text-gray-500">
                                            <span className="font-semibold text-foreground">Note:</span>{" "}
                                            This is an approximate value based on standard industrial ratios.
                                            Please consult your structural engineer for exact requirements.
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "weight" && (
                        <motion.div
                            key="weight"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-10"
                        >
                            <div className="mb-8 text-center md:text-left">
                                <h4 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                                    Calculate Weight & Bundling
                                </h4>
                                <p className="mt-2 font-body text-gray-500">
                                    Determine accurate weights and bundle sizes for logistical planning.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="group flex flex-col">
                                    <label className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-focus-within:text-foreground">
                                        Diameter (mm)
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 p-4 font-medium text-foreground outline-none transition-all focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                                            value={diameter}
                                            onChange={(e) => setDiameter(e.target.value)}
                                        >
                                            {[8, 10, 12, 16, 20, 25, 32].map((d) => (
                                                <option key={d} value={d}>
                                                    {d} mm
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                <div className="group flex flex-col">
                                    <label className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-focus-within:text-foreground">
                                        Length (m)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                                        value={length}
                                        onChange={(e) => setLength(e.target.value)}
                                    />
                                </div>

                                <div className="group flex flex-col">
                                    <label className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-focus-within:text-foreground">
                                        Quantity (Bars)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                                        placeholder="e.g. 100"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={calculateWeight}
                                className="group relative w-full overflow-hidden rounded-xl bg-foreground py-5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.15)]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Calculate Weight & Bundles
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                            </button>

                            {estimatedWeight !== null && bundleCount !== null && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
                                >
                                    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-8">
                                        <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-accent-yellow/10 blur-3xl" />
                                        <div className="relative z-10 w-full text-center">
                                            <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                                                Total Weight
                                            </div>
                                            <div className="mt-2 font-heading text-5xl font-black tracking-tight text-foreground md:text-6xl">
                                                {estimatedWeight.toFixed(2)}{" "}
                                                <span className="font-body text-2xl font-normal text-gray-400">
                                                    kg
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-8">
                                        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-accent-red/5 blur-3xl" />
                                        <div className="relative z-10 w-full text-center">
                                            <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                                                Estimated Bundles
                                            </div>
                                            <div className="mt-2 font-heading text-5xl font-black tracking-tight text-foreground md:text-6xl">
                                                {bundleCount}{" "}
                                                <span className="font-body text-2xl font-normal text-gray-400">
                                                    units
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
