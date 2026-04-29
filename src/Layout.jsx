import { motion, useScroll, useSpring } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const navItems = [
  { label: 'skills',    to: '/skills'    },
  { label: 'projects',  to: '/projects'  },
  { label: 'blog',      to: '/blog'      },
  { label: 'contact',   to: '/contact'   },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function Layout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-ink-bg text-ink-text">
      <ScrollToTop />

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gr origin-left"
        style={{ scaleX }}
      />

      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-ink-border bg-ink-bg/95 backdrop-blur-sm">
        <nav className="mx-auto flex w-[min(960px,92%)] items-center justify-between py-4">
          <NavLink to="/" className="font-mono text-sm font-semibold text-gr">
            tapasvi@madhak<span className="text-ink-dim">:~$</span>
          </NavLink>
          <ul className="flex gap-6 font-mono text-sm">
            {navItems.map(({ label, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-gr'
                      : 'text-ink-dim hover:text-gr transition-colors duration-150'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-[min(960px,92%)]">
        <Outlet />
      </main>

      <footer className="border-t border-ink-border py-8 text-center font-mono text-xs text-ink-muted">
        <span className="text-[#22c55e]/60">©</span> {new Date().getFullYear()} tapasvi madhak
        <span className="mx-2 text-ink-border">·</span>built with react
      </footer>
    </div>
  );
}
