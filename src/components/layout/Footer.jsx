import { goTo } from '../../utils/navigation'

export function Footer({ site }) {
  return (
    <footer className="border-t border-slate-300/80 bg-[#eef3f7]">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 text-center sm:px-8 md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <div className="font-serif text-2xl font-bold text-navy">{site.title}</div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            {site.copyright}
          </p>
        </div>
        <div className="flex justify-center gap-7 text-sm font-bold text-slate-600 underline underline-offset-4">
          <button onClick={() => goTo('archive')}>Archive</button>
          <button onClick={() => goTo('about')}>About</button>
          <button onClick={() => goTo('contact')}>Contact</button>
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
