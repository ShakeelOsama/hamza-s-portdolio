"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

export default function MemberNav({ slug, navItems }) {
  const pathname = usePathname();
  
  // Find the current active item
  const getActiveIndex = () => {
    if (pathname === `/member/${slug}`) return 0; // Home
    for (let i = 1; i < navItems.length; i++) {
      const navPath = `/member/${slug}/${navItems[i].toLowerCase()}`;
      if (pathname === navPath) {
        return i;
      }
      // Highlight 'Projects' for both /projects and /projects/[projectSlug]
      if (
        navItems[i].toLowerCase() === 'projects' &&
        (pathname.startsWith(`/member/${slug}/projects`) || pathname === navPath)
      ) {
        return i;
      }
    }
    return 0;
  };

  const activeIndex = getActiveIndex();

  return (
    <nav className="relative flex items-center space-x-3 md:space-x-4 bg-white/10 backdrop-blur-md rounded-full p-2 md:p-3 border border-white/20">
      {/* Animated Background Highlight (exclude Exit button) */}
      <motion.div
        className="absolute inset-2 bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] rounded-full shadow-lg"
        initial={false}
        animate={{
          x: `${activeIndex * 100}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          width: `calc(${100 / (navItems.length + 1)}% - 8px)`, // +1 for Exit button
        }}
      />
      
      {navItems.map((item, index) => {
        const href = item === 'Home'
          ? `/member/${slug}`
          : `/member/${slug}/${item.toLowerCase()}`;
        const isActive = index === activeIndex;
        
        return (
          <Link
            key={item}
            href={href}
            className={`relative z-10 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive 
                ? 'text-white font-semibold' 
                : 'text-gray-300 hover:text-white hover:scale-105'
            }`}
          >
            {item}
          </Link>
        );
      })}
      {/* Exit Button */}
      <Link
        href="/"
        className="relative z-10 flex items-center px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ease-in-out text-white hover:text-[#fd79a8] hover:scale-105 ml-2"
        style={{ fontWeight: 600 }}
        title="Exit to Home"
      >
        <FiLogOut className="mr-1 text-lg md:text-xl" /> Exit
      </Link>
    </nav>
  );
} 