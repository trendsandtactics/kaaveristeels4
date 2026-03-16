"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SteelCalculator() {

  const [activeTab, setActiveTab] = useState<"construction" | "weight">("construction");

  const [isVerified, setIsVerified] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", phone: "" });

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


  const handleLeadSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (!leadData.name || !leadData.phone) return;

    console.log("Lead captured:", leadData);

    setIsVerified(true);
    setShowLeadForm(false);

  };


  const handleConstructionClick = () => {

    if (!isVerified) {
      setShowLeadForm(true);
      return;
    }

    calculateConstruction();

  };


  const handleWeightClick = () => {

    if (!isVerified) {
      setShowLeadForm(true);
      return;
    }

    calculateWeight();

  };


  return (

    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
    >

      {/* Header */}

      <div className="border-b border-gray-200 p-6 text-center">

        <h2 className="text-3xl font-bold">
          Steel <span className="text-red-600">Calculator</span>
        </h2>

        <p className="text-gray-500 mt-2">
          Instantly estimate steel requirement, weight and bundles.
        </p>

      </div>


      {/* Tabs */}

      <div className="flex border-b border-gray-200">

        <button
          onClick={() => setActiveTab("construction")}
          className={`flex-1 py-4 font-semibold ${activeTab === "construction" ? "bg-black text-white" : "bg-gray-50 text-gray-600"}`}
        >
          Construction Steel
        </button>

        <button
          onClick={() => setActiveTab("weight")}
          className={`flex-1 py-4 font-semibold ${activeTab === "weight" ? "bg-black text-white" : "bg-gray-50 text-gray-600"}`}
        >
          Weight & Bundle
        </button>

      </div>


      <div className="p-8">


        <AnimatePresence mode="wait">


          {/* Construction Calculator */}


          {activeTab === "construction" && (

            <motion.div
              key="construction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >

              <div className="grid md:grid-cols-3 gap-4">

                <select
                  className="border p-3 rounded-lg"
                  value={structureType}
                  onChange={(e) => setStructureType(e.target.value)}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>


                <input
                  type="number"
                  placeholder="Area (sq.ft)"
                  className="border p-3 rounded-lg"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />


                <input
                  type="number"
                  placeholder="Floors"
                  className="border p-3 rounded-lg"
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                />

              </div>


              <button
                onClick={handleConstructionClick}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold"
              >
                Calculate Requirement
              </button>


              {estimatedSteel !== null && (

                <div className="p-6 bg-gray-100 rounded-xl text-center">

                  <h3 className="text-lg text-gray-500">
                    Estimated Steel
                  </h3>

                  <p className="text-4xl font-bold mt-2">
                    {estimatedSteel.toLocaleString()} kg
                  </p>

                </div>

              )}

            </motion.div>

          )}



          {/* Weight Calculator */}


          {activeTab === "weight" && (

            <motion.div
              key="weight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >

              <div className="grid md:grid-cols-4 gap-4">

                <select
                  className="border p-3 rounded-lg"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                >
                  {[8,10,12,16,20,25,32].map(d => (
                    <option key={d} value={d}>
                      {d} mm
                    </option>
                  ))}
                </select>


                <input
                  type="number"
                  className="border p-3 rounded-lg"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />


                <input
                  type="number"
                  placeholder="Quantity"
                  className="border p-3 rounded-lg"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />


                <button
                  onClick={handleWeightClick}
                  className="bg-black text-white rounded-lg"
                >
                  Calculate
                </button>

              </div>


              {estimatedWeight !== null && (

                <div className="grid md:grid-cols-2 gap-4">

                  <div className="p-6 bg-gray-100 rounded-xl text-center">
                    <h3 className="text-gray-500">
                      Total Weight
                    </h3>
                    <p className="text-4xl font-bold mt-2">
                      {estimatedWeight.toFixed(2)} kg
                    </p>
                  </div>


                  <div className="p-6 bg-gray-100 rounded-xl text-center">
                    <h3 className="text-gray-500">
                      Estimated Bundles
                    </h3>
                    <p className="text-4xl font-bold mt-2">
                      {bundleCount}
                    </p>
                  </div>

                </div>

              )}

            </motion.div>

          )}


        </AnimatePresence>

      </div>



      {/* Lead Popup */}


      {showLeadForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md"
          >

            <h3 className="text-2xl font-bold mb-2">
              Enter Your Details
            </h3>

            <p className="text-gray-500 mb-6">
              Please enter your details to continue.
            </p>


            <form onSubmit={handleLeadSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                value={leadData.name}
                onChange={(e) =>
                  setLeadData({ ...leadData, name: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              />


              <input
                type="tel"
                placeholder="Phone Number"
                value={leadData.phone}
                onChange={(e) =>
                  setLeadData({ ...leadData, phone: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              />


              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold"
              >
                Continue
              </button>

            </form>

          </motion.div>

        </div>

      )}


    </motion.section>

  );
}
