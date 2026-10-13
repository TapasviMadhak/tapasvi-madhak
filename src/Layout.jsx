import { motion, useScroll, useSpring } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const navItems = [
  { label: 'home', to: '/' }, { label: 'skills', to: '/skills' }, { label: 'projects', to: '/projects' }, { label: 'blog', to: '/blog' }, { label: 'contact', to: '/contact' },
];

function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0); }, [pathname]); return null; }

export default function Layout() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <div className="flex min-h-screen bg-ink-bg text-ink-text"><ScrollToTop /><aside className="fixed top-0 left-0 z-30 flex h-screen flex-col border-r border-ink-border bg-ink-bg/95 backdrop-blur-sm" style={{ width: '220px' }}><motion.div className="absolute left-0 top-0 w-[2px] origin-top bg-gr" style={{ scaleY, height: '100%' }} /><div className="border-b border-ink-border px-6 pb-6 pt-8"><NavLink to="/" className="block font-mono text-sm font-semibold leading-snug text-gr">tapasvi@madhak<span className="mt-0.5 block text-xs text-ink-dim">:~$</span></NavLink></div><nav className="flex-1 px-4 py-6"><ul className="space-y-1">{navItems.map(({ label, to }) => <li key={label}><NavLink to={to} end={to === '/'} className={({ isActive }) => `flex w-full items-center gap-2 rounded border px-3 py-2 font-mono text-sm transition-all duration-150 ${isActive ? 'border-gr/20 bg-gr-faint/30 text-gr' : 'border-transparent text-ink-dim hover:bg-ink-surface hover:text-gr'}`}>{({ isActive }) => <><span className="text-[10px] opacity-60">{isActive ? '▶' : '·'}</span>{label}</>}</NavLink></li>)}</ul></nav><div className="px-6 pb-6 font-mono text-[10px] text-ink-muted"><span className="text-[#22c55e]/40">©</span> {new Date().getFullYear()} tapasvi madhak</div></aside><div className="flex min-h-screen flex-1 flex-col" style={{ marginLeft: '220px' }}><main className="mx-auto w-full max-w-[860px] flex-1 px-6 py-4"><Outlet /></main><footer className="border-t border-ink-border py-8 text-center font-mono text-xs text-ink-muted"><span className="text-[#22c55e]/60">©</span> {new Date().getFullYear()} tapasvi madhak</footer></div></div>;
}
