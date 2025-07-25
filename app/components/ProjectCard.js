"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function ProjectCard({ project, index, memberSlug }) {
  return (
    <Link
      href={`/member/${memberSlug}/projects/${project.slug}`}
      className="group relative bg-white/10 backdrop-blur-lg p-6 pt-8 rounded-3xl border border-[#6c5ce7]/30 shadow-xl transition-all duration-400 ease-in-out cursor-pointer overflow-hidden hover:bg-gradient-to-br hover:from-[#23234a]/60 hover:via-[#302b63]/60 hover:to-[#24243e]/60 w-full h-auto"
      prefetch={true}
    >
      {/* Featured Badge (dummy for now) */}
      <div className="absolute top-4 left-4 z-10">
        <span className="flex items-center gap-1 bg-gradient-to-r from-[#fd79a8] to-[#00cec9] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          <FaStar className="text-yellow-300" /> Featured
        </span>
      </div>
      {/* Project Image */}
      <div className="w-full h-44 mb-4 rounded-2xl overflow-hidden bg-[#23234a] flex items-center justify-center shadow-lg transition">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Title */}
      <h2 className="text-2xl font-extrabold text-center mb-2 text-white bg-clip-text bg-gradient-to-r from-[#a29bfe] via-[#00cec9] to-[#fd79a8] drop-shadow-lg">
        {project.title}
      </h2>
      {/* Short Description (truncated to 15 words) */}
      <p className="text-center text-base text-gray-200 leading-relaxed mb-3 font-medium">
        {project.description.split(' ').slice(0, 15).join(' ')}{project.description.split(' ').length > 15 ? '...' : ''}
      </p>
      {/* Technologies */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {project.skills.slice(0, 2).map((skill, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#6c5ce7]/30 to-[#00cec9]/30 border border-[#6c5ce7]/30 text-white font-semibold flex items-center gap-1 shadow"
            title={skill.name}
          >
            <span className="text-lg">{skill.icon}</span> {skill.name}
          </span>
        ))}
        {project.skills.length > 2 && (
          <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#fd79a8]/30 to-[#00cec9]/30 border border-[#fd79a8]/30 text-white font-semibold flex items-center gap-1 shadow">
            +{project.skills.length - 2} more
          </span>
        )}
      </div>
      {/* View Details Button */}
      <div className="mt-6 w-full flex justify-center">
        <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] text-white font-bold py-2 px-8 rounded-full shadow-md text-base tracking-wide transition-all duration-200">
          View Details
        </span>
      </div>
      {/* Glass overlay for extra shine */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{background: 'linear-gradient(120deg,rgba(162,155,254,0.08) 0%,rgba(0,206,201,0.06) 100%)', zIndex: 0}} />
    </Link>
  );
} 