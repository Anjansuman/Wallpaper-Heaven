"use client";

import React from "react";
import { motion } from "framer-motion";

interface CreatorCardProps {
  image: string;
  name: string;
  brand: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ image, name, brand }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-[150px] h-[200px] flex flex-col items-center justify-start bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200"
    >
      {/* Top Half */}
      <div className="w-full h-[60%] flex items-center justify-center bg-[#41c0a5]">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center ">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 object-cover rounded-full"
          />
        </div>
      </div>

      {/* Bottom Half */}
      <div className="w-full h-[40%] flex flex-col items-center justify-center px-2 text-center gap-1 bg-white">
        <div className="text-base font-semibold text-neutral-800">{name}</div>
        <div className="text-sm text-neutral-500">{brand}</div>
      </div>
    </motion.div>
  );
};

export default CreatorCard;
