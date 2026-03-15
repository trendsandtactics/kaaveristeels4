"use client";

import React from "react";
import { motion } from "framer-motion";

const locations = [
  {
    title: "Office Address",
    address: (
      <>
        No-1, Shyam’s Court,<br />
        16/19 Judge Jambulingam Street,<br />
        Mylapore, Chennai - 600004
      </>
    ),
    map: "https://maps.google.com/maps?q=No-1%20Shyams%20Court%20Judge%20Jambulingam%20Street%20Mylapore%20Chennai%20600004&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    title: "Unit 1",
    address: (
      <>
        No.7/1 & 4/3, Komal Road, Maruthur Village,<br />
        Therizhandur Post, Kuttalam Taluk,<br />
        Mayiladuthurai District - 609 808
      </>
    ),
    map: "https://maps.google.com/maps?q=Komal%20Road%20Maruthur%20Village%20Therizhandur%20Mayiladuthurai%20609808&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    title: "Unit 2",
    address: (
      <>
        S.F.No: 22/1A, Musiri – Thuraiyur Main Road,<br />
        Jambunathapuram Post, Musiri Taluk,<br />
        Trichy – 621 205
      </>
    ),
    map: "https://maps.google.com/maps?q=Musiri%20Thuraiyur%20Main%20Road%20Jambunathapuram%20Trichy%20621205&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
];

export default function MapEmbed() {
  return (
    <section className="w-full py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto space-y-24">

        {locations.map((loc, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-stretch bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 p-12 flex flex-col justify-center"
            >
              <h3 className="font-heading text-3xl text-accent-red mb-6">
                {loc.title}
              </h3>

              <p className="font-body text-black/70 text-lg leading-relaxed">
                {loc.address}
              </p>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 min-h-[400px] relative"
            >
              <iframe
                src={loc.map}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          </div>
        ))}

      </div>
    </section>
  );
}
