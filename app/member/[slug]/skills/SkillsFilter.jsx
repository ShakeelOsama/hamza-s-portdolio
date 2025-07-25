'use client';
import { useState } from 'react';
import { FaTools, FaCode, FaLayerGroup, FaPalette, FaDatabase, FaWrench } from 'react-icons/fa';

export default function SkillsFilter({ skills, categories }) {
  const [filter, setFilter] = useState('all');
  const filteredSkills =
    filter === 'all'
      ? skills
      : skills.filter((skill) => skill.category.toLowerCase() === filter.toLowerCase());

  const categoryIcons = {
    all: <FaLayerGroup className="inline mr-2" />,
    frontend: <FaCode className="inline mr-2" />,
    backend: <FaDatabase className="inline mr-2" />,
    devops: <FaTools className="inline mr-2" />,
    design: <FaPalette className="inline mr-2" />,
    tools: <FaWrench className="inline mr-2" />,
  };

  // Unique color combinations for each category
  const categoryColors = {
    frontend: { icon: '#00b4d8', progress: 'from-[#00b4d8] to-[#00cec9]', border: '#00b4d8' },
    backend: { icon: '#fd79a8', progress: 'from-[#fd79a8] to-[#fdcb6e]', border: '#fd79a8' },
    devops: { icon: '#6c5ce7', progress: 'from-[#6c5ce7] to-[#a29bfe]', border: '#6c5ce7' },
    design: { icon: '#00cec9', progress: 'from-[#00cec9] to-[#55a3ff]', border: '#00cec9' },
    tools: { icon: '#fdcb6e', progress: 'from-[#fdcb6e] to-[#e17055]', border: '#fdcb6e' },
    default: { icon: '#00b4d8', progress: 'from-[#00b4d8] to-[#00cec9]', border: '#00b4d8' }
  };

  const getCategoryColor = (category) => {
    return categoryColors[category.toLowerCase()] || categoryColors.default;
  };

  return (
    <>
      {/* Category Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg border-2 flex items-center transition-all duration-200 backdrop-blur-md
              ${filter === cat
                ? 'bg-gradient-to-r from-[#6c5ce7] via-[#00b4d8] to-[#00cec9] text-white border-[#00cec9] shadow-[0_2px_16px_#00cec966]'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'}
            `}
            style={{ letterSpacing: '0.04em' }}
          >
            {categoryIcons[cat] || null}
            {cat === 'all' ? 'All Skills' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => {
          const colors = getCategoryColor(skill.category);
          return (
            <div
              key={index}
              className="group flex items-center gap-4 p-4 rounded-xl border border-white/20 transition-all duration-200 ease-in-out relative overflow-hidden backdrop-blur-xl shadow-lg min-h-[90px] hover:scale-[1.02]"
              style={{ 
                background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(45, 55, 72, 0.9) 100%)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${colors.border}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
              }}
            >
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none" />
              <div className="relative z-10 flex items-center w-full">
                <span className="text-3xl md:text-4xl drop-shadow-lg flex-shrink-0 mr-2 md:mr-4" style={{ color: colors.icon }}>{skill.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-base md:text-lg font-extrabold text-white tracking-wide">
                      {skill.name}
                    </h3>
                    <span className="text-xs md:text-sm font-bold" style={{ color: colors.icon }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full rounded-full shadow"
                      style={{ 
                        width: `${skill.level}%`,
                        background: `linear-gradient(to right, ${colors.icon}, ${colors.progress.split('to-[')[1].replace(']', '')})`
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">
                    {skill.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
} 