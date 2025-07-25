import fs from 'fs/promises';
import path from 'path';
import TeamCard from './components/TeamCard';

async function getTeamData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'team.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export const metadata = {
  title: 'Meet Our Dev Team | DevTeam Portfolio',
  description: 'We are a team of skilled developers, designers, and creators crafting high-performance solutions for clients worldwide.',
};

export default async function Home() {
  const teamData = await getTeamData();
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center p-6 md:p-12 text-white overflow-hidden">
      {/* Gradient Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-xl">
        <span className="bg-gradient-to-r from-[#a29bfe] via-[#fd79a8] to-[#00cec9] text-transparent bg-clip-text">
          Hamza Noor — Full Stack Developer
        </span>
      </h1>

      {/* Highlighted Subtitle */}
      <p className="text-lg md:text-xl mb-10 max-w-2xl text-center text-gray-300">
        <span className="text-[#a29bfe]">Passionate Full Stack Developer</span> specializing in React.js, Next.js, and scalable backend solutions. Dedicated to crafting beautiful, high-performance digital products and delivering exceptional user experiences.
      </p>

      {/* Cards Grid */}
      {teamData.length === 1 ? (
        <div className="flex justify-center items-center w-full">
          <TeamCard member={teamData[0]} index={0} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {teamData.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 w-full py-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p className="mb-2">Built with ❤️ by Hamza Noor</p>
        <p>© {new Date().getFullYear()} Hamza Noor. All rights reserved.</p>
      </footer>
    </main>
  );
}
