import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaCode, FaMobileAlt, FaBrain, FaRegStar } from 'react-icons/fa';

// Map icon names to react-icons
const iconMap = {
  web: <FaCode className="text-2xl text-[#a29bfe]" />,
  android: <FaMobileAlt className="text-2xl text-[#00cec9]" />,
  ai: <FaBrain className="text-2xl text-[#fd79a8]" />,
};

async function getTeamData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'team.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function generateStaticParams() {
  const teamData = await getTeamData();
  return teamData.map((member) => ({ slug: member.slug }));
}

export default async function AboutPage({ params }) {
  const { slug } = await params;
  const teamData = await getTeamData();
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return notFound();

  // Example fallback data if fields are missing
  const aboutTitle = member.aboutTitle || 'Software Engineering Student & Developer';
  const aboutSummary = member.aboutSummary || `As a passionate software engineering student, I'm dedicated to crafting innovative digital solutions that solve real-world problems. I believe in clean code, elegant design, and user-centered thinking. Whether building web applications, mobile apps, or exploring AI possibilities, I approach each project with creativity and precision.`;
  const aboutTags = member.aboutTags || ['React', 'Node.js', 'MongoDB', 'Express', 'Flutter', 'Python'];
  const aboutHighlights = member.aboutHighlights || [
    {
      icon: 'web',
      title: 'Web Development',
      description: 'Full-stack development with MERN stack, creating scalable web applications.'
    },
    {
      icon: 'android',
      title: 'Android Development',
      description: 'Native Android apps using Flutter and Dart with modern UI/UX principles.'
    },
    {
      icon: 'ai',
      title: 'AI/ML Enthusiast',
      description: 'Implementing intelligent solutions with cutting-edge AI technologies.'
    }
  ];

  return (
    <div className="max-w-6xl w-full mx-auto px-2 md:px-0">
      {/* Centered Heading Section */}
      <div className="flex flex-col items-center justify-center mb-10 mt-4">
        <div className="flex items-center gap-2 text-[#a29bfe] font-semibold text-base md:text-lg mb-2">
          <FaRegStar className="text-[#fd79a8] animate-pulse" />
          <span className="tracking-wide uppercase">Get to know me</span>
          <FaRegStar className="text-[#00cec9] animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-2">
          About <span className="bg-gradient-to-r from-[#a29bfe] via-[#fd79a8] to-[#00cec9] text-transparent bg-clip-text">Me</span>
        </h1>
        <span className="block h-1 w-28 animated-underline rounded-full mt-2 mb-2" />
      </div>
      {/* Main Content Row */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left Section (Card) */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden transition-transform duration-300 hover:scale-[1.015] hover:shadow-[0_8px_32px_#6c5ce7aa]">
            <div>
              <h2 className="text-lg font-semibold text-[#a29bfe] mb-2 flex items-center gap-2">
                <span className="animate-pulse">•</span> {aboutTitle}
              </h2>
              <p className="mb-6 text-gray-200 leading-relaxed">
                {aboutSummary}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {aboutTags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold border border-[#333] shadow shadow-[#6c5ce7]/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00cec9] hover:bg-[#6c5ce7]/20 hover:scale-105"
                    tabIndex={0}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Link href={`/member/${slug}/contact`} className="bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] px-6 py-2 rounded-full font-semibold shadow-md hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00cec9]">
                Get In Touch
              </Link>
              <Link href="#" className="border border-[#6c5ce7] px-6 py-2 rounded-full font-semibold hover:bg-[#1e1e40] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a29bfe]">
                Download CV
              </Link>
            </div>
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{background: 'linear-gradient(120deg,rgba(162,155,254,0.08) 0%,rgba(0,206,201,0.06) 100%)', zIndex: 0}} />
          </div>
        </div>
        {/* Right Section: Highlights (unchanged) */}
        <div className="flex-1 flex flex-col gap-6">
          {aboutHighlights.map((highlight, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:scale-[1.025] transition-transform duration-200 relative overflow-hidden group">
              <div className="flex-shrink-0">
                {iconMap[highlight.icon] || <FaCode className="text-2xl text-[#a29bfe]" />}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-white group-hover:text-[#00cec9] transition-colors duration-200">{highlight.title}</h3>
                <p className="text-gray-300 text-sm group-hover:text-white transition-colors duration-200">{highlight.description}</p>
              </div>
              {/* Card glass overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{background: 'linear-gradient(120deg,rgba(253,121,168,0.07) 0%,rgba(0,206,201,0.05) 100%)', zIndex: 0}} />
            </div>
          ))}
        </div>
      </div>
      {/* Animated underline style */}
      <style>{`
        .animated-underline {
          background: linear-gradient(90deg, #a29bfe, #fd79a8, #00cec9, #a29bfe);
          background-size: 200% 200%;
          animation: gradient-move 3s linear infinite;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
} 