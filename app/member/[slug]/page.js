import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Helper to load team data
async function getTeamData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'team.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function generateStaticParams() {
  const teamData = await getTeamData();
  return teamData.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const teamData = await getTeamData();
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: `${member.name} | DevTeam Portfolio`,
    description: member.description,
    openGraph: {
      title: `${member.name} | DevTeam Portfolio`,
      description: member.description,
      images: [member.image],
    },
  };
}

export default async function MemberPage({ params }) {
  const { slug } = await params;
  const teamData = await getTeamData();
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return notFound();

  return (
    <section
      className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24"
    >
      {/* Left Section */}
      <div className="flex-1">
        <p className="text-sm text-[#ffa500] mb-3">
          👋 Hello, I'm
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-1">
          <span className="bg-gradient-to-r from-[#a29bfe] via-[#fd79a8] to-[#00cec9] text-transparent bg-clip-text">
            {member.name.split(' ')[0]}
          </span>{' '}
          <span className="text-[#fd79a8]">{member.name.split(' ')[1]}</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-[#00b894] mb-4">
          {member.role}
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed max-w-xl">
          {member.description}
        </p>

        {/* Skills Tags (show only top 4) */}
        <div className="flex flex-wrap gap-3 mb-8 max-w-xl">
          {member.skills.slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-all duration-200
                 bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_0_8px_#ffffff22]
                 hover:border-[#00cec9] hover:shadow-[0_0_10px_#00cec9aa]"
            >
              {skill.icon} {typeof skill === 'string' ? skill : skill.name}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] px-6 py-2 rounded-full font-semibold shadow-md hover:opacity-90 transition-all duration-200">
            View My Work
          </button>
          <Link href={`/member/${slug}/contact`} className="border border-[#6c5ce7] px-6 py-2 rounded-full font-semibold hover:bg-[#1e1e40] transition-all duration-200 text-center flex items-center justify-center">
            Get In Touch
          </Link>
        </div>
      </div>

      {/* Right Section - Large Profile Image */}
      <div className="relative w-[280px] md:w-[340px] flex-shrink-0 -ml-10 md:-ml-16">
        <div className="absolute -top-4 -right-4 w-3 h-3 bg-[#fd79a8] rounded-full" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#00cec9] rounded-full" />
        <div className="p-[5px] bg-gradient-to-tr from-[#6c5ce7] via-[#fd79a8] to-[#00cec9] rounded-full w-full h-[460px]">
          <Image
            src={member.image}
            alt={member.name}
            width={340}
            height={460}
            className="w-full h-full object-cover rounded-full border-4 border-[#0f0c29]"
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>
    </section>
  );
}
