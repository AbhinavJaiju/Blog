import { motion } from 'framer-motion'
import { Bookmark, Share2 } from 'lucide-react'
import { pageVariants } from '../animations'
import { Meta } from '../shared/Meta'

export function ArticlePage({ article, related }) {
  return (
    <motion.article
      animate="animate"
      className="page-shell"
      exit="exit"
      initial="initial"
      variants={pageVariants}
    >
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <Meta category={article.category} readTime={article.readTime} />
        <h1 className="mt-7 max-w-5xl font-serif text-5xl font-bold leading-[1.05] text-navy sm:text-7xl">
          {article.title}
        </h1>
        <div className="mt-9 flex items-center gap-4 border-y border-slate-300 py-6">
          <img
            alt={article.author}
            className="h-14 w-14 rounded-sm object-cover"
            src={article.authorImage}
          />
          <div className="text-sm font-extrabold uppercase leading-5 text-navy">
            {article.author}
            <div className="text-slate-500">{article.date}</div>
          </div>
        </div>
        <img
          alt={article.heroAlt}
          className="mt-14 aspect-[16/10] w-full object-cover"
          src={article.heroImage}
        />
        <div className="prose-shell mt-14">
          <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:text-navy">
            {article.paragraphs[0]}
          </p>
          <h2>{article.sections[0]}</h2>
          <p>{article.paragraphs[1] || article.excerpt}</p>
          <blockquote>"{article.quote}"</blockquote>
          <p>{article.paragraphs[2] || article.paragraphs[0]}</p>
          <h2>{article.sections[1]}</h2>
          <p>{article.paragraphs[3] || article.paragraphs[1] || article.paragraphs[0]}</p>
        </div>
        <div className="mt-16 flex items-center gap-4">
          <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Share this thought:
          </span>
          <button aria-label="Share" className="icon-button">
            <Share2 size={19} />
          </button>
          <button aria-label="Save article" className="icon-button">
            <Bookmark size={19} />
          </button>
        </div>
      </section>
      <RelatedReadings related={related} />
    </motion.article>
  )
}

function RelatedReadings({ related }) {
  return (
    <section className="border-t border-slate-300">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="text-center font-serif text-3xl font-bold uppercase tracking-[0.18em] text-navy">
          Related Readings
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {related.map((item) => (
            <article key={item.title}>
              <img alt="" className="aspect-[4/3] w-full object-cover" src={item.image} />
              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                {item.category}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-navy">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
