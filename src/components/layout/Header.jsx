import { Menu } from 'lucide-react'
import { goTo } from '../../utils/navigation'

export function Header({ navItems, page }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-300/80 bg-[#eef3f7]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          aria-label="Open navigation"
          className="grid h-8 w-8 place-items-center text-navy md:hidden"
        >
          <Menu size={22} />
        </button>
        <button
          className="font-serif text-[1.45rem] font-bold uppercase leading-[1.05] tracking-[0.18em] text-navy sm:text-2xl md:text-[1.7rem]"
          onClick={() => goTo('home')}
        >
          The<br className="sm:hidden" /> Perspective
        </button>
        <nav className="hidden items-center gap-9 text-xs font-extrabold tracking-[0.12em] text-slate-500 md:flex">
          {navItems.slice(0, 3).map((item) => (
            <button
              className={`border-b-2 pb-1 transition ${
                page === item.id ? 'border-navy text-navy' : 'border-transparent hover:text-navy'
              }`}
              key={item.id}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          className="bg-navy px-4 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#123c69] sm:px-7"
          onClick={() => goTo('contact')}
        >
          Newsletter
        </button>
      </div>
    </header>
  )
}
