export function Newsletter({ newsletter }) {
  return (
    <section className="border-y border-slate-300/80 bg-white">
      <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8">
        <h2 className="font-serif text-4xl font-bold leading-tight text-navy">
          {newsletter.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          {newsletter.description}
        </p>
        <div className="mx-auto mt-7 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto]">
          <input
            className="border border-slate-300 bg-white px-5 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-navy"
            placeholder="Your email address"
            type="email"
          />
          <button className="bg-navy px-10 py-4 text-sm font-extrabold text-white">
            Join Us
          </button>
        </div>
      </div>
    </section>
  )
}
