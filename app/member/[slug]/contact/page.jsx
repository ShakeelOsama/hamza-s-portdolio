import fs from 'fs/promises';
import path from 'path';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaFacebook, FaRegStar } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import ContactForm from './ContactForm';

async function getTeamData() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'team.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function generateStaticParams() {
  const teamData = await getTeamData();
  return teamData.map((member) => ({ slug: member.slug }));
}

export const metadata = {
  title: 'Contact | DevTeam Portfolio',
  description: 'Contact our team for collaboration, project inquiries, or networking.',
};

export default async function ContactPage({ params }) {
  const { slug } = await params;
  const teamData = await getTeamData();
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return notFound();
  const contact = member.contact || {};

  return (
    <div className="max-w-7xl w-full mx-auto px-2 md:px-8">
      {/* Centered Heading Section */}
      <div className="flex flex-col items-center justify-center mb-10 mt-4">
        <div className="flex items-center gap-2 text-[#a29bfe] font-semibold text-base md:text-lg mb-2">
          <FaRegStar className="text-[#fd79a8] animate-pulse" />
          <span className="tracking-wide uppercase">Let's Connect</span>
          <FaRegStar className="text-[#00cec9] animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-2" style={{ textShadow: '0 2px 16px #6c5ce7cc, 0 1px 0 #fff' }}>
          Get In <span className="bg-gradient-to-r from-[#a29bfe] via-[#fd79a8] to-[#00cec9] text-transparent bg-clip-text">Touch</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mt-2 mb-4">
          Have a project in mind or want to collaborate? I'm always excited to discuss new opportunities and bring innovative ideas to life. Let's create something amazing together!
        </p>
        <span className="block h-1 w-28 animated-underline rounded-full mt-2 mb-2" />
      </div>
      {/* Main Content Row */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full">
        {/* Left: Contact Info Card */}
        <div className="flex-1 flex flex-col w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 flex flex-col gap-6 transition-transform duration-300 hover:scale-[1.015] hover:shadow-[0_8px_32px_#6c5ce7aa] w-full">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
              <FaRegStar className="text-[#a29bfe]" /> Contact Information
            </h2>
            <div className="flex flex-col gap-4">
              {/* Email */}
              {contact.email && (
                <div className="flex items-center gap-4 bg-[#18192a] rounded-xl p-4 border border-white/10 shadow hover:shadow-[#a29bfe]/30 transition">
                  <div className="bg-gradient-to-br from-[#a29bfe] to-[#fd79a8] p-3 rounded-lg">
                    <FaEnvelope className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">Email</div>
                    <div className="text-gray-300 text-sm">{contact.email}</div>
                  </div>
                </div>
              )}
              {/* Phone */}
              {contact.phone && (
                <div className="flex items-center gap-4 bg-[#18192a] rounded-xl p-4 border border-white/10 shadow hover:shadow-[#00cec9]/30 transition">
                  <div className="bg-gradient-to-br from-[#00cec9] to-[#6c5ce7] p-3 rounded-lg">
                    <FaPhone className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">Phone</div>
                    <div className="text-gray-300 text-sm">{contact.phone}</div>
                  </div>
                </div>
              )}
              {/* Location */}
              {contact.location && (
                <div className="flex items-center gap-4 bg-[#18192a] rounded-xl p-4 border border-white/10 shadow hover:shadow-[#fd79a8]/30 transition">
                  <div className="bg-gradient-to-br from-[#fd79a8] to-[#a29bfe] p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">Location</div>
                    <div className="text-gray-300 text-sm">{contact.location}</div>
                  </div>
                </div>
              )}
            </div>
            {/* Social Links */}
            {(contact.github || contact.linkedin || contact.facebook) && (
              <div className="mt-6">
                <div className="font-semibold text-white mb-2 flex items-center gap-2">
                  <FaRegStar className="text-[#00cec9]" /> Connect With Me
                </div>
                <div className="flex gap-4 mt-2">
                  {contact.github && (
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="bg-[#23234a] p-3 rounded-lg hover:bg-[#a29bfe] transition" aria-label="GitHub">
                      <FaGithub className="text-xl text-white" />
                    </a>
                  )}
                  {contact.linkedin && (
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="bg-[#23234a] p-3 rounded-lg hover:bg-[#00cec9] transition" aria-label="LinkedIn">
                      <FaLinkedin className="text-xl text-white" />
                    </a>
                  )}
                  {contact.facebook && (
                    <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="bg-[#23234a] p-3 rounded-lg hover:bg-[#fd79a8] transition" aria-label="Facebook">
                      <FaFacebook className="text-xl text-white" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Right: Send a Message Card */}
        <div className="flex-1 flex flex-col w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 flex flex-col gap-6 transition-transform duration-300 hover:scale-[1.015] hover:shadow-[0_8px_32px_#00cec9aa] w-full">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
              {/* FaPaperPlane icon is in ContactForm */} Send a Message
            </h2>
            <ContactForm />
          </div>
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