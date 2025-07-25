'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

const TeamCard = ({ member, index }) => {
  const shortDescription =
    member.description.length > 90
      ? member.description.slice(0, 90).trim() + '...'
      : member.description;

  return (
    <Link href={`/member/${member.slug}`} className="block group relative">
      {/* 🎌 Premium Waving Badge */}
      <div className="absolute top-0 left-0 z-20">
        <div className="flag-badge">
          <span className="flag-text">Available</span>
        </div>
      </div>

      {/* 💳 Team Card */}
      <motion.div
        key={member.name}
        className="group bg-gradient-to-br from-[#1a1a2e] via-[#12101f] to-[#0f0c29] hover:from-[#222437] hover:to-[#1b1d2f] p-6 pt-8 rounded-2xl border border-[#333] hover:border-[#6c5ce7]/70 shadow-lg hover:shadow-purple-500/20 transition-all duration-400 ease-in-out cursor-pointer"
        whileHover={{ scale: 1.04 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.15, type: 'spring', stiffness: 80 }}
      >
        {/* 🖼 Image */}
        <div className="w-24 h-24 mx-auto mb-4">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover rounded-full border-4 border-[#6c5ce7] group-hover:border-[#00b894] shadow-md transition"
          />
        </div>

        {/* 🔠 Name */}
        <h2 className="text-2xl font-bold text-center mb-1 text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#a29bfe] via-[#00cec9] to-[#fd79a8] transition duration-300">
          {member.name}
        </h2>

        {/* 🧑‍💼 Role */}
        <p className="text-center text-sm text-[#00e0b3] mb-2 font-semibold tracking-wide">
          {member.role}
        </p>

        {/* 📝 Description */}
        <p className="text-center text-sm text-gray-300 leading-relaxed">
          {shortDescription}{' '}
          <span className="text-[#6c5ce7] underline group-hover:text-[#00cec9] transition duration-300 text-xs">
            See more →
          </span>
        </p>
      </motion.div>

      {/* 🎨 Flag Styles */}
      <style jsx>{`
        .flag-badge {
          position: relative;
          background: linear-gradient(to right, #00c853, #00e676);
          padding: 6px 14px;
          clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
          animation: flutter 2s ease-in-out infinite;
          transform-origin: top left;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 255, 170, 0.3);
        }

        .flag-text {
          font-size: 11px;
          font-weight: bold;
          color: white;
          letter-spacing: 0.5px;
        }

        @keyframes flutter {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1.5deg);
          }
          50% {
            transform: rotate(-1.2deg);
          }
          75% {
            transform: rotate(0.8deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </Link>
  );
};

export default TeamCard;
