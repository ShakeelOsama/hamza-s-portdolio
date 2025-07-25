import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import ImageCarousel from '@/app/components/ImageCarousel';

async function getTeamData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'team.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function generateStaticParams() {
  const teamData = await getTeamData();
  const params = [];
  for (const member of teamData) {
    if (member.projects) {
      for (const project of member.projects) {
        params.push({ slug: member.slug, projectSlug: project.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, projectSlug } = await params;
  const teamData = await getTeamData();
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return {};
  const project = (member.projects || []).find((p) => p.slug === projectSlug);
  if (!project) return {};
  return {
    title: `${project.title} | ${member.name} Portfolio`,
    description: project.shortDescription || project.description,
    openGraph: {
      title: `${project.title} | ${member.name} Portfolio`,
      description: project.shortDescription || project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug, projectSlug } = await params;
  const teamData = await getTeamData();
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return notFound();
  const project = (member.projects || []).find((p) => p.slug === projectSlug);
  if (!project) return notFound();

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col items-center relative">
      {/* Back button at top right */}
      <Link
        href={`/member/${slug}/projects`}
        className="absolute right-0 top-0 flex items-center gap-2 text-white text-lg font-medium hover:text-[#fd79a8] transition-colors duration-200 z-20 mt-6 mr-6"
        style={{ minWidth: 'auto' }}
        title="Back to Projects"
      >
        <FiLogOut className="text-2xl md:text-2xl" />
        <span>Back</span>
      </Link>
      <div className="w-full flex flex-col md:flex-row gap-10 md:gap-20 items-stretch">
        {/* Left: Heading, About, Technologies, Links */}
        <div className="flex-1 flex flex-col gap-6 min-w-0 justify-start">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#a29bfe] via-[#fd79a8] to-[#00cec9] text-transparent bg-clip-text drop-shadow-xl text-left mt-4 mb-2 w-full">
            {project.title}
          </h1>
          <div className="text-sm text-gray-400 mb-4 text-left">
            {project.date && <span className="mr-4">{project.date}</span>}
            {project.organization && <span>{project.organization}</span>}
          </div>
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold text-[#a29bfe] mb-2">About the Project</h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-0">
              {project.description}
            </p>
          </div>
          {/* Skills/Technologies Section */}
          <div>
            <h2 className="text-xl font-bold text-[#00cec9] mb-3">Technologies Used</h2>
            <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-white/5 border border-[#6c5ce7]/20 shadow-inner">
              {project.skills.map((skill, i) => (
                <span key={i} className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-[#6c5ce7]/30 to-[#00cec9]/30 border border-[#6c5ce7]/30 text-white font-semibold flex items-center gap-2 shadow hover:scale-105 transition">
                  <span className="text-xl">{skill.icon}</span> {skill.name}
                </span>
              ))}
            </div>
          </div>
          {/* Links Section */}
          <div>
            <h2 className="text-xl font-bold text-[#fd79a8] mb-3">Links</h2>
            <div className="flex gap-4 flex-wrap">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] px-6 py-2 rounded-full font-bold text-white shadow-md hover:opacity-90 transition-all duration-200 text-base"
                >
                  Visit Site
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#6c5ce7] px-6 py-2 rounded-full font-bold text-white hover:bg-[#1e1e40] transition-all duration-200 text-base"
                >
                  GitHub
                </a>
              )}
              <Link
                href={`/member/${slug}/contact`}
                className="bg-gradient-to-r from-[#fd79a8] to-[#00cec9] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:opacity-90 transition-all duration-200 text-base"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
        {/* Right: Image Carousel */}
        <div className="flex-1 flex flex-col items-center justify-start min-w-0">
          <ImageCarousel images={project.images || (project.image ? [project.image] : [])} title={project.title} />
        </div>
      </div>
    </div>
  );
} 