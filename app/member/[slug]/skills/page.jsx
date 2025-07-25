import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import SkillsFilter from './SkillsFilter';
import { FaRegStar } from 'react-icons/fa';

async function getTeamData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'team.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function generateStaticParams() {
  const teamData = await getTeamData();
  return teamData.map((member) => ({ slug: member.slug }));
}

export default async function SkillsPage({ params }) {
  const { slug } = await params;
  const teamData = await getTeamData();
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return notFound();

  const categories = ['all', ...new Set(member.skills.map((s) => s.category.toLowerCase()).filter(Boolean))];

  return (
    <div>
      {/* Centered Headings Section */}
      <div className="flex flex-col items-center justify-center mb-10 mt-4">
        <div className="flex items-center gap-2 text-[#a29bfe] font-semibold text-base md:text-lg mb-2">
          <FaRegStar className="text-[#fd79a8] animate-pulse" />
          <span className="tracking-wide uppercase">Technical Expertise</span>
          <FaRegStar className="text-[#00cec9] animate-pulse" />
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-2">
          <span className="bg-gradient-to-r from-[#a29bfe] via-[#fd79a8] to-[#00cec9] text-transparent bg-clip-text">My Skills</span>
        </h2>
        <span className="block h-1 w-28 animated-underline rounded-full mt-2 mb-2" />
      </div>
      <SkillsFilter skills={member.skills} categories={categories} />
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
