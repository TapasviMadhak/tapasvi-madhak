import { motion, useScroll, useSpring } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const navItems = [
  { label: 'home',     to: '/'        },
  { label: 'skills',   to: '/skills'  },
  { label: 'projects', to: '/projects'},
  { label: 'blog',     to: '/blog'    },
  { label: 'contact',  to: '/contact' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function Layout() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="flex min-h-screen bg-ink-bg text-ink-text">
      <ScrollToTop />

      {/* ── Left Sidebar Panel ── */}
      <aside
        className="fixed top-0 left-0 h-screen z-30 flex flex-col border-r border-ink-border bg-ink-bg/95 backdrop-blur-sm"
        style={{ width: '220px' }}
      >
        {/* Scroll progress — vertical bar on left edge */}
        <motion.div
          className="absolute left-0 top-0 w-[2px] bg-gr origin-top"
          style={{ scaleY, height: '100%' }}
        />

        {/* Brand / logo */}
        <div className="px-6 pt-8 pb-6 border-b border-ink-border">
          <NavLink
            to="/"
            className="font-mono text-sm font-semibold text-gr leading-snug block"
          >
            tapasvi@madhak
            <span className="text-ink-dim block text-xs mt-0.5">:~$</span>
          </NavLink>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navItems.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2 w-full font-mono text-sm px-3 py-2 rounded transition-all duration-150',
                      isActive
                        ? 'text-gr bg-gr-faint/30 border border-gr/20'
                        : 'text-ink-dim hover:text-gr hover:bg-ink-surface border border-transparent',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="text-[10px] opacity-60">{isActive ? '▶' : '·'}</span>
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer hint */}
        <div className="px-6 pb-6 font-mono text-[10px] text-ink-muted">
          <span className="text-[#22c55e]/40">©</span> {new Date().getFullYear()} tapasvi madhak
        </div>
      </aside>

      {/* ── Main content area, offset by sidebar width ── */}
      <div
        className="flex flex-col flex-1 min-h-screen"
        style={{ marginLeft: '220px' }}
      >
        <main className="flex-1 mx-auto w-full max-w-[860px] px-6 py-4">
          <Outlet />
        </main>

        <footer className="border-t border-ink-border py-8 text-center font-mono text-xs text-ink-muted">
          <span className="text-[#22c55e]/60">©</span> {new Date().getFullYear()} tapasvi madhak
        </footer>
      </div>
    </div>
  );
}
