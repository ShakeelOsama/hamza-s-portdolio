import fs from 'fs/promises';
import path from 'path';
import ProjectCard from '../components/ProjectCard';

async function getProjectsData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'projects.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export const metadata = {
  title: 'Our Projects | DevTeam Portfolio',
  description: 'Explore our previous projects, technologies used, and live demos.',
};

export default async function ProjectsPage() {
  const projects = await getProjectsData();
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center p-6 md:p-12 text-white overflow-hidden">
      {/* Gradient Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-xl">
        <span className="bg-gradient-to-r from-[#a29bfe] via-[#fd79a8] to-[#00cec9] text-transparent bg-clip-text">
          Our Projects
        </span>
      </h1>
      <p className="text-lg md:text-xl mb-10 max-w-2xl text-center text-gray-300">
        <span className="text-[#a29bfe]">Explore</span> our previous work, technologies, and live demos.
      </p>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
      {/* Footer */}
      <footer className="mt-16 w-full py-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p className="mb-2">Built with  by Hamza Noor, Jahanzaib & Hamayal</p>
        <p> {new Date().getFullYear()} DevTeam. All rights reserved.</p>
      </footer>
    </main>
  );
} 