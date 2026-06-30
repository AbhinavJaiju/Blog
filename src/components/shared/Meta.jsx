export function Meta({ category, readTime }) {
  return (
    <div className="flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-500">
      <span className="bg-slate-200/70 px-3 py-1 text-slate-600">{category}</span>
      <span>{readTime}</span>
    </div>
  )
}
