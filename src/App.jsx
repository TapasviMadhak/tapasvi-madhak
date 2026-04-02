import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, LockKeyhole, Mail, Github, Linkedin, Trophy, BookOpen, ExternalLink, Music2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { certifications, fallbackProjects, githubUsername, skillCategories } from './data/portfolioData';
import ProjectsSection from './components/ProjectsSection';
import NeoCursor from './components/NeoCursor';
import { fetchLiveGithubProjects } from './services/githubProjects';
import tapasviPhoto from './data/tapasvi.jpeg';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const spotifyTopArtists = [
  {
    name: 'Tame Impala',
    image: 'https://i.scdn.co/image/ab67616100005174e412a782245eb20d9626c601',
    link: 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb',
  },
  {
    name: 'Twenty One Pilots',
    image: 'https://i.scdn.co/image/ab6761610000517461a7ea26d33ded218cd1e59d',
    link: 'https://open.spotify.com/artist/3YQKmKGau1PzlVlkL1iodx',
  },
  {
    name: 'Joji',
    image: 'https://i.scdn.co/image/ab67616100005174b6d7836808e8b99fc8c7aadc',
    link: 'https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq',
  },
  {
    name: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab676161000051749e528993a2820267b97f6aae',
    link: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ',
  },
];

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [liveProjects, setLiveProjects] = useState(fallbackProjects);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Fetch Medium blog posts via RSS2JSON
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tapasviMadhak')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          // Get all posts (expandable as you write more)
          setBlogPosts(data.items);
        }
        setLoadingBlogs(false);
      })
      .catch((error) => {
        console.error('Error fetching Medium posts:', error);
        setLoadingBlogs(false);
      });
  }, []);

  useEffect(() => {
    fetchLiveGithubProjects(githubUsername, fallbackProjects)
      .then((projects) => {
        if (projects.length > 0) {
          setLiveProjects(projects);
        }
      })
      .catch((error) => {
        console.error('Error fetching GitHub repositories:', error);
      })
      .finally(() => {
        setLoadingProjects(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cyber-bg text-white">
      <NeoCursor />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyber-neon via-cyber-lime to-cyber-orange origin-left"
        style={{ scaleX: scaleProgress }}
      />
      
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(125,249,255,.2),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,122,24,.28),transparent_26%),radial-gradient(circle_at_35%_75%,rgba(179,255,54,.22),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />

      <header className="sticky top-0 z-20 border-b-2 border-white/20 bg-cyber-bg/85 backdrop-blur">
        <nav className="mx-auto flex w-[min(1120px,92%)] items-center justify-between py-4">
          <a href="#top" className="font-display text-2xl font-bold tracking-wide text-cyber-neon">
            TAPASVI
            <span className="ml-1 text-base font-semibold text-cyber-orange">&lt;/&gt;</span>
            <span className="ml-1">MADHAK</span>
          </a>
          <ul className="hidden gap-3 font-semibold md:flex">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <li key={item}>
                <a className="rounded-lg border-2 border-transparent px-3 py-1.5 capitalize transition hover:-translate-y-0.5 hover:border-cyber-neon" href={`#${item}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid w-[min(1120px,92%)] gap-8 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <motion.div initial="hidden" animate="show" variants={fadeInUp} transition={{ duration: 0.55 }}>
            <p className="inline-flex rounded-full border-2 border-black bg-cyber-lime px-4 py-1.5 font-display text-sm font-bold text-black shadow-brutal">
              Cybersecurity Student
            </p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-6xl">
              Breaking systems
              <span className="block text-cyber-neon">to secure them better.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-cyber-slate md:text-lg">
              I build practical security projects across vulnerability assessment, monitoring,
              and defensive automation. I am focused on becoming a security engineer with both
              red-team curiosity and blue-team discipline.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-cyber-neon px-5 py-3 font-bold text-black shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-cyber-orange px-5 py-3 font-bold text-black shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1">
                Collaborate
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="animate-floaty rounded-2xl border-2 border-black bg-cyber-card p-6 shadow-brutal"
          >
            <h2 className="font-display text-2xl font-semibold text-cyber-lime">Quick Stats</h2>
            <ul className="mt-4 space-y-3 text-cyber-slate">
              <li className="flex items-center justify-between rounded-xl border border-white/15 bg-black/20 px-4 py-3">
                <span>Certificates</span><strong className="text-white">9</strong>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-white/15 bg-black/20 px-4 py-3">
                <span>Projects</span><strong className="text-white">{loadingProjects ? '...' : liveProjects.length}</strong>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-white/15 bg-black/20 px-4 py-3">
                <span>Write-ups</span><strong className="text-white">{loadingBlogs ? '...' : blogPosts.length}</strong>
              </li>
            </ul>
            <div className="mt-5 rounded-xl border border-cyber-neon/40 bg-cyber-neon/10 p-4">
              <p className="text-sm leading-relaxed text-cyber-neon">
                Preparing for EC-Council's CSA, pursuing M.Sc. IT (Cybersecurity & Forensics) at Parul University, Vadodara.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl border-2 border-black bg-cyber-lime px-4 py-3 text-black shadow-brutal">
              <Trophy size={18} />
              <p className="text-sm font-bold">Top 2% Global Rank on TryHackMe</p>
            </div>
          </motion.aside>
        </section>

        <section id="about" className="mx-auto w-[min(1120px,92%)] py-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border-2 border-black bg-cyber-card p-7 shadow-brutal"
          >
            <p className="font-display text-sm font-bold text-cyber-neon">
              # About.system
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">
              Operator Profile
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-xl border border-white/20 bg-black/20 p-4 text-sm text-cyber-slate">
                <div className="flex h-full items-center justify-center gap-6 p-2">
                  <img
                    src={tapasviPhoto}
                    alt="Tapasvi Madhak"
                    className="h-36 w-36 rounded-xl border-2 border-black object-cover"
                  />
                  <p className="font-display text-4xl font-semibold leading-tight text-cyber-neon">Tapasvi Madhak</p>
                </div>
              </div>
              <div className="rounded-xl border border-cyber-neon/40 bg-cyber-neon/10 p-4">
                <div className="mb-4 rounded-lg border border-white/20 bg-black/20 p-3 text-sm text-cyber-slate">
                  <p>ROLE: Cybersecurity Student</p>
                  <p>FOCUS: Web App Security + SOC Basics</p>
                  <p>STATUS: Open for internships</p>
                  <p>LOCATION: India</p>
                </div>
                <p className="text-sm leading-relaxed text-cyber-slate">
                  I am building a career in cybersecurity by combining offensive testing with
                  defensive engineering. I enjoy converting findings into practical fixes and secure
                  development habits that teams can actually adopt.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="skills" className="mx-auto w-[min(1120px,92%)] py-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-sm font-bold text-cyber-lime"># Skills & Certifications</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Security Stack & Credentials</h2>
            <p className="mt-2 max-w-3xl text-sm text-cyber-slate">
              Skills and industry certifications in cybersecurity and development.
            </p>
          </motion.div>
          
          <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:items-stretch">
            <div className="rounded-2xl border-2 border-black bg-cyber-card p-6 shadow-brutal lg:h-[640px]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyber-neon/85">#skills.json</p>
              <h3 className="mt-2 font-display text-lg font-semibold">Technical Skills</h3>
              <div className="elegant-scrollbar mt-5 h-[calc(100%-3rem)] space-y-5 overflow-y-auto pr-2">
                {Object.entries(skillCategories).map(([category, items], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: categoryIndex * 0.06 }}
                    className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h4 className="mb-2.5 font-display text-xl font-semibold">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/90"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div id="certifications" className="rounded-2xl border-2 border-black bg-cyber-card p-6 shadow-brutal lg:h-[640px]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyber-orange/90">#certificates.json</p>
              <h3 className="mt-2 font-display text-lg font-semibold">Certifications &amp; Training</h3>
              <div className="elegant-scrollbar mt-5 h-[calc(100%-3rem)] space-y-2.5 overflow-y-auto pr-2">
                {certifications.map((cert, index) => (
                  <motion.a
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-black/20 px-3.5 py-3 transition hover:border-cyber-neon/50"
                  >
                    <span className="line-clamp-2 text-base font-semibold leading-snug">{cert.name}</span>
                    <ExternalLink size={18} className="shrink-0 text-white/70 transition group-hover:text-cyber-neon" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection projects={liveProjects} fadeInUp={fadeInUp} />



        <section id="blog" className="mx-auto w-[min(1120px,92%)] py-8">
          <p className="font-display text-sm font-bold text-cyber-orange">$ cat ~/medium-blog.xml</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Latest Articles</h2>
          <p className="mt-2 max-w-3xl text-cyber-slate">
            Technical writeups and security insights from my Medium blog.
          </p>
          
          {loadingBlogs ? (
            <div className="mt-5 rounded-2xl border-2 border-black bg-cyber-card p-8 text-center shadow-brutal">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyber-neon border-t-transparent"></div>
              <p className="mt-3 text-cyber-slate">Loading blog posts...</p>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="mt-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-5" style={{ width: 'max-content' }}>
              {blogPosts.map((post, index) => {
                // Extract first image from content or use a default
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = post.description || '';
                const firstImg = tempDiv.querySelector('img');
                const thumbnail = firstImg ? firstImg.src : null;
                
                // Clean excerpt (remove HTML tags)
                const excerpt = post.description
                  ? post.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
                  : 'Read more on Medium';

                return (
                  <motion.article
                    key={post.guid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="group w-80 flex-shrink-0 rounded-2xl border-2 border-black bg-cyber-card shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1"
                  >
                    {thumbnail && (
                      <div className="overflow-hidden rounded-t-xl">
                        <img 
                          src={thumbnail} 
                          alt={post.title}
                          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="mb-2 flex items-center gap-2 text-xs text-cyber-slate">
                        <BookOpen size={14} />
                        <span>{new Date(post.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold leading-tight">{post.title}</h3>
                      <p className="mt-2 text-sm text-cyber-slate">{excerpt}</p>
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="mt-4 inline-flex items-center gap-1 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs font-semibold text-cyber-neon transition hover:underline"
                      >
                        Read on Medium <ExternalLink size={14} />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border-2 border-black bg-cyber-card p-8 text-center shadow-brutal">
              <BookOpen size={32} className="mx-auto text-cyber-slate" />
              <p className="mt-3 text-cyber-slate">No blog posts found. Check back soon!</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <a 
              href="https://medium.com/@tapasviMadhak" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-cyber-neon px-5 py-3 font-bold text-black shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1"
            >
              View All Posts <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section id="contact" className="mx-auto w-[min(1120px,92%)] py-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border-2 border-black bg-cyber-orange p-7 text-black shadow-brutal"
          >
            <p className="font-display text-sm font-bold">$ ./contact.exe</p>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <h2 className="font-display text-3xl font-semibold">Let us Connect</h2>
                <p className="mt-2 max-w-xl font-semibold">
                  Open to internships, security research collaboration, and CTF partnerships.
                </p>
              </div>
              <LockKeyhole size={36} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:madhaktapasvi@gmail.com" className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-cyber-lime px-5 py-3 font-bold shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1"><Mail size={18} /> Email</a>
              <a href="https://github.com/TapasviMadhak" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-5 py-3 font-bold shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1"><Github size={18} /> GitHub</a>
              <a href="https://linkedin.com/in/tapasvi-madhak-159945248" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-5 py-3 font-bold shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1"><Linkedin size={18} /> LinkedIn</a>
              <a href="https://tryhackme.com/p/tapasvimadhak" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-5 py-3 font-bold shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1"><Trophy size={18} /> TryHackMe</a>
              <div className="group relative">
                <a href="https://open.spotify.com/user/znbd5z9xewbe2w8aptnyznyql?si=938284d859224e29" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-5 py-3 font-bold shadow-brutal transition hover:-translate-x-1 hover:-translate-y-1">
                  <Music2 size={18} /> Spotify
                </a>
                <div className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-3 w-[min(92vw,560px)] -translate-x-1/2 translate-y-2 rounded-2xl border-2 border-black bg-white p-3 text-black opacity-0 shadow-brutal transition duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <p className="font-display text-sm font-bold">Top 4 Personal Artists</p>
                    <span className="rounded-full border border-black/20 bg-cyber-neon/30 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">Spotify</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {spotifyTopArtists.map((artist, index) => (
                      <motion.a
                        key={artist.name}
                        href={artist.link}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                        className="group/card overflow-hidden rounded-xl border border-black/15 bg-black/5"
                      >
                        <div className="h-24 overflow-hidden sm:h-28">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="h-full w-full object-cover transition duration-500 group-hover/card:scale-110"
                          />
                        </div>
                        <p className="truncate border-t border-black/15 bg-white px-2 py-1 text-[11px] font-bold">{artist.name}</p>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 py-8 text-center text-sm text-cyber-slate">
        {new Date().getFullYear()} TAPASVI MADHAK &lt;/&gt;
      </footer>
    </div>
  );
}

export default App;
