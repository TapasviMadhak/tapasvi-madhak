import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { fallbackProjects, githubUsername } from '../data/portfolioData';
import { fetchLiveGithubProjects } from '../services/githubProjects';

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

// Map language → subtle accent color
const langColor = (lang = '') => {
  const map = {
    Python:     '#3b82f6',
    JavaScript: '#eab308',
    TypeScript: '#6366f1',
    Bash:       '#22c55e',
    C:          '#ec4899',
    Go:         '#06b6d4',
    Rust:       '#f97316',
  };
  return map[lang] || '#6b7280';
};

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetchLiveGithubProjects(githubUsername, fallbackProjects)
      .then(p => { if (p.length > 0) setProjects(p); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.4 }}>
        <p className="font-mono text-xs text-[#22c55e]/60 mb-4 tracking-wide">$ ls ~/projects</p>
        <div className="flex items-end justify-between mb-10">
          <h1 className="text-3xl font-bold text-ink-white">Projects</h1>
          <a
            href="https://github.com/TapasviMadhak"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-gr hover:underline flex items-center gap-1"
          >
            GitHub <ExternalLink size={12} />
          </a>
        </div>

        {loading ? (
          <div className="text-center py-16 font-mono text-sm text-ink-muted">
            <span className="text-gr">▊</span> loading repositories…
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => {
              const color = langColor(project.stack);
              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative flex flex-col rounded-md border border-ink-border bg-ink-surface overflow-hidden hover:border-ink-muted transition-colors duration-200"
                  style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
                >
                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Folder size={14} style={{ color }} className="shrink-0 mt-0.5" />
                        <h2 className="font-mono text-sm font-semibold text-ink-white group-hover:text-gr transition-colors leading-tight">
                          {project.title}
                        </h2>
                      </div>
                      <span
                        className="font-mono text-[10px] px-2 py-0.5 rounded shrink-0 border"
                        style={{
                          color,
                          borderColor: `${color}40`,
                          backgroundColor: `${color}12`,
                        }}
                      >
                        {project.stack}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-ink-dim leading-relaxed line-clamp-3 flex-1">
                      {project.text}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-ink-border flex items-center justify-between">
                    <span className="font-mono text-[10px] text-ink-muted">{project.tag}</span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-ink-muted hover:text-gr flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink size={11} /> view repo
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
}
