import { motion } from 'framer-motion';

function ProjectsSection({ projects, shouldScrollProjects, fadeInUp }) {
  return (
    <section id="projects" className="mx-auto w-[min(1120px,92%)] py-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <p className="font-display text-sm font-bold text-cyber-orange">$ ls -la ~/projects</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Live GitHub Projects</h2>
      </motion.div>
      <div className={`mt-5 ${shouldScrollProjects ? 'elegant-scrollbar max-h-[700px] overflow-y-auto pr-2' : ''}`}>
        <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full min-h-[220px] rounded-2xl border-2 border-black bg-cyber-card p-6 shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1"
            >
              <p className="inline-flex rounded-full border-2 border-black bg-cyber-neon px-3 py-1 text-xs font-bold text-black">
                {project.tag}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-sm text-cyber-slate">{project.text}</p>
              <div className="mt-4 flex gap-2">
                <span className="rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-xs text-cyber-slate">{project.stack}</span>
                <a href={project.link} target="_blank" rel="noreferrer" className="rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-xs font-semibold text-cyber-neon hover:underline">Repository</a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
