import { motion } from 'framer-motion'
import { BookOpen, ChevronDown, Send, Share2 } from 'lucide-react'
import { pageVariants } from '../animations'

export function ContactPage({ contact }) {
  return (
    <motion.div
      animate="animate"
      className="page-shell"
      exit="exit"
      initial="initial"
      variants={pageVariants}
    >
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <h1 className="font-serif text-6xl font-bold leading-tight text-navy">{contact.headline}</h1>
        <p className="mt-8 max-w-3xl text-2xl leading-relaxed text-slate-600">
          {contact.intro}
        </p>
        <div className="my-12 border-t border-slate-300" />
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-navy">
              Direct Email
            </p>
            <a className="mt-4 block font-serif text-3xl font-bold text-navy" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <p className="mt-10 text-sm font-extrabold uppercase tracking-[0.18em] text-navy">
              Social Channels
            </p>
            <div className="mt-5 flex gap-7 text-lg font-bold text-slate-600">
              <a className="inline-flex items-center gap-2" href="#">
                <Share2 size={18} /> Twitter
              </a>
              <a className="inline-flex items-center gap-2" href="#">
                <BookOpen size={18} /> Substack
              </a>
            </div>
            <img
              alt={contact.imageAlt}
              className="mt-12 aspect-[4/2.3] w-full object-cover"
              src={contact.image}
            />
          </div>
          <ContactForm />
        </div>
      </section>
    </motion.div>
  )
}

function ContactForm() {
  return (
    <form className="border border-slate-300 bg-white p-7 sm:p-10">
      <label className="form-label">
        Full Name
        <input placeholder="E.g. Julian Barnes" />
      </label>
      <label className="form-label">
        Email Address
        <input placeholder="julian@example.com" type="email" />
      </label>
      <label className="form-label">
        Subject
        <span className="relative block">
          <select defaultValue="General Inquiry">
            <option>General Inquiry</option>
            <option>Collaboration</option>
            <option>Speaking</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        </span>
      </label>
      <label className="form-label">
        Your Message
        <textarea placeholder="Write your thoughts here..." rows="6" />
      </label>
      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_0.75fr] sm:items-center">
        <button className="inline-flex items-center justify-center gap-3 bg-navy px-8 py-5 text-base font-extrabold uppercase tracking-[0.08em] text-white">
          Send Message <Send size={19} />
        </button>
        <p className="text-sm leading-5 text-slate-600">
          I typically respond within 48 hours to thoughtful inquiries.
        </p>
      </div>
    </form>
  )
}
