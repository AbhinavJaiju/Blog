export function goTo(page, options = {}) {
  const route = options.slug ? `${page}/${options.slug}` : page
  window.location.hash = page === 'home' ? '' : route
  window.dispatchEvent(new CustomEvent('perspective:navigate', { detail: { page, ...options } }))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
