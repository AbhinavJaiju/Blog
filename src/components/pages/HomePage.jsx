import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { pageVariants, riseIn, stagger } from '../animations'
import { Meta } from '../shared/Meta'
import { Newsletter } from '../shared/Newsletter'
import { goTo } from '../../utils/navigation'

export function HomePage({ articles, featured, newsletter }) {
  return (
    <motion.div
      animate="animate"
      className="page-shell"
      exit="exit"
      initial="initial"
      variants={pageVariants}
    >
      <motion.section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16" variants={stagger}>
        <motion.div variants={riseIn}>
          <img
            alt={featured.imageAlt}
            className="h-44 w-full object-cover sm:h-72"
            src={featured.image}
          />
        </motion.div>
        <motion.div className="mt-8 max-w-3xl" variants={riseIn}>
          <Meta category={featured.category} readTime={featured.date} />
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-navy sm:text-6xl">
            {featured.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {featured.excerpt}
          </p>
          <button
            className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-navy"
            onClick={() => goTo('article')}
          >
            Read the feature <ArrowRight size={18} />
          </button>
        </motion.div>
      </motion.section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="flex items-end justify-between border-b border-slate-300 pb-5">
          <h2 className="font-serif text-3xl font-bold text-navy">Recent Articles</h2>
          <button
            className="text-xs font-extrabold tracking-[0.12em] text-slate-500"
            onClick={() => goTo('archive')}
          >
            View Archive
          </button>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {articles.map((article, index) => (
            <motion.article
              className="border-b border-slate-300 pb-9 md:border-b-0"
              initial={{ opacity: 0, y: 28 }}
              key={article.title}
              transition={{ delay: index * 0.08, duration: 0.42 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <img alt="" className="aspect-[4/4.6] w-full object-cover" src={article.image} />
              <div className="mt-5 flex items-center gap-3 text-xs font-extrabold text-slate-500">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-navy">
                {article.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{article.excerpt}</p>
              <p className="mt-5 text-sm font-bold text-slate-500">{article.date}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-navy px-12 py-4 text-sm font-extrabold text-white transition hover:bg-[#123c69]">
            Load More Perspectives
          </button>
        </div>
      </section>

      <Newsletter newsletter={newsletter} />
    </motion.div>
  )
}
