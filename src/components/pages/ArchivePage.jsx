import { motion } from 'framer-motion'
import { pageVariants } from '../animations'
import { goTo } from '../../utils/navigation'

export function ArchivePage({ articles, featured }) {
  return (
    <motion.div
      animate="animate"
      className="page-shell"
      exit="exit"
      initial="initial"
      variants={pageVariants}
    >
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <h1 className="font-serif text-6xl font-bold text-navy">Archive</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          A quiet index of essays on design, philosophy, technology, and the discipline of attention.
        </p>
        <div className="mt-12 divide-y divide-slate-300 border-y border-slate-300">
          {[{ title: featured.title, date: 'Oct 24, 2024', topic: featured.category }, ...articles].map((item) => (
            <button
              className="grid w-full gap-4 py-7 text-left transition hover:bg-white/60 md:grid-cols-[150px_1fr_140px]"
              key={item.title}
              onClick={() => goTo('article', { slug: item.slug || featured.slug })}
            >
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                {item.topic || item.category}
              </span>
              <span className="font-serif text-2xl font-bold text-navy">{item.title}</span>
              <span className="text-sm font-bold text-slate-500">{item.date}</span>
            </button>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
