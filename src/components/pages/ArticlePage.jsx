import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Bookmark, Share2 } from 'lucide-react'
import { pageVariants } from '../animations'
import { Meta } from '../shared/Meta'
import { getComments, submitComment } from '../../integrations/hygraph'

export function ArticlePage({ article, related }) {
  const [comments, setComments] = useState([])
  const [formState, setFormState] = useState({ name: '', email: '', comment: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isActive = true

    async function fetchComments() {
      if (!article?.slug) return

      try {
        const result = await getComments(article.slug)
        if (isActive) setComments(result)
      } catch (error) {
        console.warn('Unable to load comments', error)
      }
    }

    fetchComments()

    return () => {
      isActive = false
    }
  }, [article?.slug])

  const contentBlocks = article.contentBlocks || article.paragraphs.map((paragraph) => ({
    type: 'paragraph',
    children: [{ text: paragraph }],
  }))

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
          {contentBlocks.map((block, blockIndex) => (
            <p
              className={
                blockIndex === 0
                  ? 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:text-navy'
                  : undefined
              }
              key={`${block.type}-${blockIndex}`}
            >
              {block.children.map((child, childIndex) => (
                <RichTextSpan child={child} key={`${child.text}-${childIndex}`} />
              ))}
            </p>
          ))}
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

        <CommentsSection
          articleSlug={article.slug}
          comments={comments}
          formState={formState}
          isSubmitting={isSubmitting}
          statusMessage={statusMessage}
          errorMessage={errorMessage}
          onChange={(field, value) => setFormState((prev) => ({ ...prev, [field]: value }))}
          onSubmit={async (event) => {
            event.preventDefault()
            setStatusMessage('')
            setErrorMessage('')

            if (!article.slug) {
              setErrorMessage('Comments are unavailable for this article.')
              return
            }

            if (!formState.name.trim() || !formState.email.trim() || !formState.comment.trim()) {
              setErrorMessage('Please complete all comment fields.')
              return
            }

            setIsSubmitting(true)

            try {
              await submitComment({
                name: formState.name,
                email: formState.email,
                comment: formState.comment,
                slug: article.slug,
              })

              setFormState({ name: '', email: '', comment: '' })
              setStatusMessage('Comment submitted successfully.')
              const latestComments = await getComments(article.slug)
              setComments(latestComments)
            } catch (error) {
              console.error(error)
              setErrorMessage('Unable to submit comment right now. Please try again later.')
            } finally {
              setIsSubmitting(false)
            }
          }}
        />
      </section>
      <RelatedReadings related={related} />
    </motion.article>
  )
}

function RichTextSpan({ child }) {
  let content = child.text

  if (child.bold) {
    content = <strong>{content}</strong>
  }

  if (child.italic) {
    content = <em>{content}</em>
  }

  if (child.underline) {
    content = <u>{content}</u>
  }

  return <>{content}</>
}

function CommentsSection({
  articleSlug,
  comments,
  formState,
  isSubmitting,
  statusMessage,
  errorMessage,
  onChange,
  onSubmit,
}) {
  return (
    <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-navy">Comments</h2>
          <p className="text-sm text-slate-500">
            Share your thoughts or read what others have added.
          </p>
        </div>
        <div className="text-sm text-slate-500">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </div>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <article key={`${comment.name}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{comment.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{comment.comment}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mb-6 text-sm text-slate-500">Be the first to leave a comment.</p>
      )}

      <form className="mt-10 space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            <span>Name</span>
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
              value={formState.name}
              onChange={(event) => onChange('name', event.target.value)}
              type="text"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Email</span>
            <input
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
              value={formState.email}
              onChange={(event) => onChange('email', event.target.value)}
              type="email"
              placeholder="Your email"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-700">
          <span>Comment</span>
          <textarea
            className="min-h-[140px] w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-slate-400"
            value={formState.comment}
            onChange={(event) => onChange('comment', event.target.value)}
            placeholder="Write your thoughts..."
          />
        </label>

        {statusMessage && <p className="text-sm text-emerald-600">{statusMessage}</p>}
        {errorMessage && <p className="text-sm text-rose-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </section>
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
