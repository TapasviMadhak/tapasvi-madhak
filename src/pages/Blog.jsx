import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export default function Blog() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tapasviMadhak')
      .then(r => r.json())
      .then(d => { if (d.status === 'ok') setPosts(d.items); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.4 }}>
        <p className="font-mono text-xs text-[#22c55e]/60 mb-4 tracking-wide">
          $ curl medium.com/@tapasviMadhak
        </p>
        <div className="flex items-end justify-between mb-10">
          <h1 className="text-3xl font-bold text-ink-white">Articles</h1>
          <a
            href="https://medium.com/@tapasviMadhak"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-gr hover:underline flex items-center gap-1"
          >
            All posts <ArrowRight size={12} />
          </a>
        </div>

        {loading ? (
          <div className="text-center py-16 font-mono text-sm text-ink-muted">
            <span className="text-gr">▊</span> fetching articles…
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={32} className="mx-auto text-ink-muted mb-3" />
            <p className="font-mono text-sm text-ink-muted">No articles found. Check back soon.</p>
            <a
              href="https://medium.com/@tapasviMadhak"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-gr hover:underline"
            >
              Visit Medium profile <ArrowRight size={12} />
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
              {posts.map((post, i) => {
                const excerpt = post.description
                  ? post.description.replace(/<[^>]*>/g, '').substring(0, 110) + '…'
                  : '';
                return (
                  <motion.a
                    key={post.guid}
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="group flex items-start gap-5 rounded-md border border-ink-border bg-ink-surface px-5 py-4 hover:border-[#22c55e]/30 hover:bg-ink-hover transition-colors duration-150"
                  >
                    <p className="font-mono text-[11px] text-ink-muted shrink-0 pt-0.5 w-24">
                      {new Date(post.pubDate).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </p>
                    <div className="min-w-0">
                      <h2 className="text-sm font-semibold text-ink-text group-hover:text-ink-white transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-xs text-ink-dim mt-1 line-clamp-1">{excerpt}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
        )}
      </motion.div>
    </section>
  );
}
