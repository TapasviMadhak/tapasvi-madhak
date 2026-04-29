import { motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="py-20 md:py-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-sm text-gr block mb-6">$ whoami</span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-ink-white tracking-tight leading-none mb-4">
            Tapasvi Madhak
          </h1>

          <p className="font-mono text-lg text-ink-dim mb-7">
            Cybersecurity Student<span className="cursor-blink text-gr">▊</span>
          </p>

          <p className="max-w-lg text-ink-text leading-relaxed mb-8">
            Building skills in offensive security and defensive engineering. Focused on web
            application security, vulnerability assessment, and SOC fundamentals. Pursuing
            M.Sc.&nbsp;IT (Cybersecurity &amp; Forensics) at Parul University, Vadodara.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 font-mono text-sm">
            <span className="flex items-center gap-1.5 text-gr">
              <Trophy size={13} />
              Top 2% on TryHackMe
            </span>
            <span className="text-ink-muted">·</span>
            <span className="text-ink-dim">9 Certifications</span>
            <span className="text-ink-muted">·</span>
            <span className="text-ink-dim">Open for Internships</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-gr hover:bg-gr-dim text-black px-5 py-2.5 font-mono text-sm font-bold rounded transition-colors duration-150"
            >
              Projects <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-ink-border hover:border-ink-muted text-ink-dim hover:text-ink-text px-5 py-2.5 font-mono text-sm rounded transition-colors duration-150"
            >
              Contact
            </Link>
            <a
              href="https://tryhackme.com/p/tapasvimadhak"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ink-border hover:border-[#22c55e]/40 text-ink-dim hover:text-gr px-5 py-2.5 font-mono text-sm rounded transition-colors duration-150"
            >
              <Trophy size={13} /> TryHackMe
            </a>
          </div>
        </motion.div>
      </section>

      <div className="border-t border-ink-border" />

      {/* ── About ── */}
      <section id="about" className="py-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fade}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-xs text-[#22c55e]/60 mb-4 tracking-wide">$ cat about.txt</p>
          <div className="grid gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-bold text-ink-white mb-1">About</h2>
              <p className="text-ink-dim leading-relaxed mt-3 max-w-xl">
                I'm building a career in cybersecurity by combining offensive testing with
                defensive engineering. I enjoy converting security findings into actionable
                fixes and building tools that make systems measurably more secure. Currently
                preparing for EC-Council's Certified Security Analyst (CSA) exam.
              </p>
            </div>
            <div className="font-mono text-sm space-y-2.5 shrink-0 min-w-[220px]">
              {[
                ['role',     'Cybersecurity Student'],
                ['focus',    'Web App Security · SOC'],
                ['status',   'Open for internships'],
                ['location', 'India'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-[#22c55e]/70 w-16 shrink-0">{k}</span>
                  <span className="text-ink-dim">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick nav to other pages */}
          <div className="mt-10 flex flex-wrap gap-2">
            {[
              { label: '→ skills',   to: '/skills'   },
              { label: '→ projects', to: '/projects' },
              { label: '→ blog',     to: '/blog'     },
              { label: '→ contact',  to: '/contact'  },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-mono text-xs border border-ink-border bg-ink-surface hover:border-[#22c55e]/40 hover:text-gr text-ink-dim px-3 py-1.5 rounded transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
