import Link from 'next/link';
import { Suspense } from 'react';
import AnimatedHeader from './AnimatedHeader';
import MemberNav from './MemberNav';

export default async function MemberLayout({ children, params }) {
  const { slug } = await params;
  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 md:px-20 py-10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        {/* Profile image + name as link to member home */}
        <Link href={`/member/${slug}`} className="group flex items-center cursor-pointer select-none" title="Go to Member Home">
          <span className="transition-transform group-hover:scale-105 group-hover:drop-shadow-lg">
            <AnimatedHeader slug={slug} />
          </span>
        </Link>

        {/* Navigation Buttons */}
        <MemberNav slug={slug} navItems={navItems} />
      </div>

      {/* Page-specific content with lazy loading */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00cec9]"></div>
        </div>
      }>
        {children}
      </Suspense>
    </main>
  );
}
