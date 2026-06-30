import { motion } from 'framer-motion'
import { BookOpen, Mail } from 'lucide-react'
import { pageVariants } from '../animations'

export function AboutPage({ about }) {
  return (
    <motion.div
      animate="animate"
      className="page-shell"
      exit="exit"
      initial="initial"
      variants={pageVariants}
    >
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_0.8fr] md:items-center md:py-20">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
            {about.eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight text-navy sm:text-6xl">
            Seeking the intersection of <em>clarity</em> and <em>depth</em> in a digital age.
          </h1>
          <div className="mt-8 h-px w-16 bg-navy" />
        </div>
        <motion.img
          alt={about.portraitAlt}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto aspect-[4/5] max-h-[430px] w-full max-w-sm object-cover grayscale"
          initial={{ opacity: 0, scale: 0.96 }}
          src={about.portrait}
          transition={{ delay: 0.18, duration: 0.5 }}
        />
      </section>

      <section className="border-y border-slate-300/80 bg-white/45">
        <div className="prose-shell mx-auto max-w-4xl px-5 py-12 sm:px-8">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <ConnectPanel />
    </motion.div>
  )
}

function ConnectPanel() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <h2 className="text-center font-serif text-2xl font-bold text-navy">Connect & Converse</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_1.3fr_1fr]">
        <SocialBox icon={<Mail size={18} />} label="X / Twitter" />
        <div className="border border-slate-300 bg-navy p-7 text-white">
          <h3 className="font-serif text-2xl font-bold">Join the Inner Circle</h3>
          <p className="mt-2 text-sm leading-6 text-white/75">
            A bi-weekly letter on architecture, philosophy, and the art of focused living.
          </p>
          <div className="mt-5 flex">
            <input className="min-w-0 flex-1 bg-white/10 px-4 py-3 text-sm outline-none" placeholder="email@example.com" />
            <button className="bg-white px-4 text-sm font-bold text-navy">Join</button>
          </div>
        </div>
        <SocialBox icon={<BookOpen size={18} />} label="Instagram" />
      </div>
    </section>
  )
}

function SocialBox({ icon, label }) {
  return (
    <button className="flex min-h-28 items-center gap-3 border border-slate-300 bg-white p-5 text-left font-serif text-lg font-bold text-navy transition hover:border-navy">
      {icon}
      {label}
    </button>
  )
}
