import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { certifications, skillCategories } from '../data/portfolioData';

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export default function Skills() {
  return (
    <section className="py-16">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ duration: 0.4 }}
      >
        <p className="font-mono text-xs text-[#22c55e]/60 mb-4 tracking-wide">$ cat skills.json</p>
        <h1 className="text-3xl font-bold text-ink-white mb-10">Skills &amp; Certifications</h1>

        <div className="grid gap-12 md:grid-cols-2">

          {/* Skills */}
          <div className="space-y-7">
            {Object.entries(skillCategories).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
              >
                <p className="font-mono text-xs text-gr uppercase tracking-widest mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="skill-tag">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <p className="font-mono text-xs text-gr uppercase tracking-widest mb-4">
              Certifications
            </p>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <motion.a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="group flex items-center justify-between gap-3 rounded-md border border-ink-border bg-ink-surface px-4 py-3 hover:border-[#22c55e]/30 hover:bg-ink-hover transition-colors duration-150"
                >
                  <span className="text-sm text-ink-text leading-snug">{cert.name}</span>
                  <ExternalLink
                    size={14}
                    className="shrink-0 text-ink-muted group-hover:text-gr transition-colors"
                  />
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
