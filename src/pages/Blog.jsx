import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

function readPosts(xmlText) {
  const feed = new DOMParser().parseFromString(xmlText, 'application/xml');
  if (feed.querySelector('parsererror')) throw new Error('Medium returned an invalid RSS feed');

  return [...feed.querySelectorAll('channel > item')].map((item) => {
    const articleHtml = item.getElementsByTagName('content:encoded')[0]?.textContent
      || item.getElementsByTagName('description')[0]?.textContent
      || '';
    const article = new DOMParser().parseFromString(articleHtml, 'text/html');
    const excerpt = article.body.textContent?.replace(/\s+/g, ' ').trim() || '';

    return {
      guid: item.getElementsByTagName('guid')[0]?.textContent,
      title: item.getElementsByTagName('title')[0]?.textContent,
      link: item.getElementsByTagName('link')[0]?.textContent,
      pubDate: item.getElementsByTagName('pubDate')[0]?.textContent,
      excerpt: excerpt.length > 110 ? `${excerpt.slice(0, 110)}…` : excerpt,
    };
  });
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/medium-feed')
      .then((response) => {
        if (!response.ok) throw new Error(`Medium feed returned ${response.status}`);
        return response.text();
      })
      .then((xml) => setPosts(readPosts(xml)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.4 }}>
        <p className="mb-4 font-mono text-xs tracking-wide text-[#22c55e]/60">
          $ curl medium.com/@tapasviMadhak
        </p>
        <div className="mb-10 flex items-end justify-between">
          <h1 className="text-3xl font-bold text-ink-white">Articles</h1>
          <a href="https://medium.com/@tapasviMadhak" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-xs text-gr hover:underline">
            All posts <ArrowRight size={12} />
          </a>
        </div>

        {loading ? (
          <div className="py-16 text-center font-mono text-sm text-ink-muted">
            <span className="text-gr">▊</span> fetching articles…
          </div>
        ) : error || posts.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpen size={32} className="mx-auto mb-3 text-ink-muted" />
            <p className="font-mono text-sm text-ink-muted">Articles could not be loaded right now.</p>
            <a href="https://medium.com/@tapasviMadhak" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-gr hover:underline">
              Visit Medium profile <ArrowRight size={12} />
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post, index) => (
              <motion.a
                key={post.guid || post.link}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="group flex items-start gap-5 rounded-md border border-ink-border bg-ink-surface px-5 py-4 transition-colors duration-150 hover:border-[#22c55e]/30 hover:bg-ink-hover"
              >
                <p className="w-24 shrink-0 pt-0.5 font-mono text-[11px] text-ink-muted">
                  {new Date(post.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold leading-snug text-ink-text transition-colors group-hover:text-ink-white">{post.title}</h2>
                  <p className="mt-1 line-clamp-1 text-xs text-ink-dim">{post.excerpt}</p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
