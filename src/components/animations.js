export const pageVariants = {
  initial: { opacity: 0, x: 36, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -28,
    filter: 'blur(8px)',
    transition: { duration: 0.28, ease: [0.55, 0.06, 0.68, 0.19] },
  },
}

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const riseIn = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
}
