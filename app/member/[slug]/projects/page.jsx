import fs from 'fs/promises';
import path from 'path';
import ProjectCard from '../../../components/ProjectCard';
import { notFound } from 'next/navigation';

async function getTeamData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'team.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function generateStaticParams() {
  const teamData = await getTeamData();
  return teamData.map((member) => ({ slug: member.slug }));
}

export default async function MemberProjectsPage({ params }) {
  const { slug } = await params;
  const teamData = await getTeamData();
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return notFound();
  const projects = member.projects || [];

  return (
    <div className="max-w-6xl w-full mx-auto px-2 md:px-0">
      {/* Centered Heading Section */}
      <div className="flex flex-col items-center justify-center mb-10 mt-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center drop-shadow-xl mb-2">
          <span className="bg-gradient-to-r from-[#a29bfe] via-[#fd79a8] to-[#00cec9] text-transparent bg-clip-text">
            {member.name.split(' ')[0]}'s Projects
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-center text-gray-300">
          <span className="text-[#a29bfe]">Explore</span> {member.name.split(' ')[0]}'s previous work, technologies, and live demos.
        </p>
        <span className="block h-1 w-28 animated-underline rounded-full mt-2 mb-2" />
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
        {projects.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg">No projects found for this member.</div>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} memberSlug={slug} />
          ))
        )}
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