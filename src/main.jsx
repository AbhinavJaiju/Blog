import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence } from 'framer-motion'
import content from './data/content.json'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HomePage } from './components/pages/HomePage'
import { ArticlePage } from './components/pages/ArticlePage'
import { AboutPage } from './components/pages/AboutPage'
import { ContactPage } from './components/pages/ContactPage'
import { ArchivePage } from './components/pages/ArchivePage'
import './styles.css'

function App() {
  const [page, setPage] = useState(() => window.location.hash.replace('#', '') || 'home')

  useEffect(() => {
    const syncHash = () => setPage(window.location.hash.replace('#', '') || 'home')
    const syncNavigation = (event) => setPage(event.detail || 'home')
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    window.addEventListener('perspective:navigate', syncNavigation)
    const locationSync = window.setInterval(syncHash, 200)
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncHash)
      window.removeEventListener('perspective:navigate', syncNavigation)
      window.clearInterval(locationSync)
    }
  }, [])

  const Page = useMemo(() => {
    switch (page) {
      case 'article':
        return () => <ArticlePage article={content.articlePage} related={content.related} />
      case 'about':
        return () => <AboutPage about={content.about} />
      case 'contact':
        return () => <ContactPage contact={content.contact} />
      case 'archive':
        return () => <ArchivePage articles={content.articles} featured={content.featured} />
      default:
        return () => (
          <HomePage
            articles={content.articles}
            featured={content.featured}
            newsletter={content.newsletter}
          />
        )
    }
  }, [page])

  return (
    <main className="min-h-screen bg-[#eef3f7] text-slate-700">
      <Header navItems={content.navigation} page={page} />
      <AnimatePresence mode="wait">
        <Page key={page} />
      </AnimatePresence>
      <Footer site={content.site} />
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
