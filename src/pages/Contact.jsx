import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Trophy, BookOpen } from 'lucide-react';

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

const links = [
  {
    label: 'Email',
    href: 'mailto:madhaktapasvi@gmail.com',
    icon: <Mail size={14} />,
    note: 'madhaktapasvi@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/TapasviMadhak',
    icon: <Github size={14} />,
    note: 'github.com/TapasviMadhak',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tapasvi-madhak-159945248',
    icon: <Linkedin size={14} />,
    note: 'linkedin.com/in/tapasvi-madhak',
  },
  {
    label: 'TryHackMe',
    href: 'https://tryhackme.com/p/tapasvimadhak',
    icon: <Trophy size={14} />,
    note: 'tryhackme.com/p/tapasvimadhak',
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@tapasviMadhak',
    icon: <BookOpen size={14} />,
    note: 'medium.com/@tapasviMadhak',
  },
];

export default function Contact() {
  return (
    <section className="py-16">
      <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.4 }}>
        <p className="font-mono text-xs text-[#22c55e]/60 mb-4 tracking-wide">$ ./contact.sh</p>
        <h1 className="font-display text-3xl font-bold text-ink-white mb-2">Get in Touch</h1>
        <p className="text-ink-text mb-10 max-w-md">
          Open to internships, security research collaboration, and CTF partnerships.
        </p>

        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">

          {/* Left: contact links */}
          <div className="flex-1 space-y-3 min-w-0">
            {links.map(({ label, href, icon, note }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
                className="group flex items-center justify-between gap-4 rounded-md border border-ink-border bg-ink-surface px-4 py-3.5 hover:border-[#22c55e]/30 hover:bg-ink-hover transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  <span className="text-ink-muted group-hover:text-gr transition-colors">{icon}</span>
                  <span className="font-mono text-sm font-medium text-ink-text">{label}</span>
                </div>
                <span className="font-mono text-xs text-ink-muted group-hover:text-ink-dim transition-colors hidden sm:block">
                  {note}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Right: portrait — B&W by default, color on hover */}
          <motion.div
            className="shrink-0 w-52 md:w-60"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 0 0 1px #252525, 0 0 28px rgba(34,197,94,0.07)',
                aspectRatio: '1 / 1',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Tapasvi Madhak"
                className="w-full h-full block"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 10%',
                  transform: 'scale(1.55)',
                  transformOrigin: 'center 38%',
                  filter: 'grayscale(1) contrast(1.05)',
                  transition: 'filter 0.5s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0) contrast(1)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(1) contrast(1.05)'}
              />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
