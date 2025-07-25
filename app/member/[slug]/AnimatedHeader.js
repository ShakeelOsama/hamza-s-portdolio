"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AnimatedHeader({ slug }) {
  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Profile Picture */}
      <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#6c5ce7] via-[#fd79a8] to-[#00cec9] shadow-lg">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0f0c29]">
          <Image
            src="/logo.jpg"
            alt="Profile"
            width={64}
            height={64}
            className="w-full h-full object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>

      {/* Name, title, and badge */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <span className="text-xl md:text-2xl font-extrabold text-[#a29bfe] capitalize leading-tight">
          {slug.split('-')[0]}
        </span>{' '}
        <span className="text-xl md:text-2xl font-extrabold text-gray-300 leading-tight">Portfolio</span>
        <span className="bg-[#23234a] px-4 py-1 rounded-full text-xs md:text-sm font-semibold text-white shadow-md ml-0 md:ml-2 mt-1 md:mt-0 whitespace-nowrap flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow" />
          Available for work
        </span>
      </div>
    </motion.div>
  );
} 