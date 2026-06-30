export function goTo(page) {
  window.location.hash = page === 'home' ? '' : page
  window.dispatchEvent(new CustomEvent('perspective:navigate', { detail: page }))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
