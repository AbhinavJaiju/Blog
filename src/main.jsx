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
import { getHygraphArticle, getHygraphBlogContent } from './integrations/hygraph'
import './styles.css'

function parseRoute() {
  const [page = 'home', slug = ''] = window.location.hash.replace('#', '').split('/')
  return {
    page: page || 'home',
    slug,
  }
}

function App() {
  const [route, setRoute] = useState(parseRoute)
  const [blogContent, setBlogContent] = useState(content)
  const [activeArticle, setActiveArticle] = useState(content.articlePage)
  const [cmsStatus, setCmsStatus] = useState('loading')
  const { page, slug } = route

  useEffect(() => {
    const updateRoute = (nextRoute) => {
      setRoute((currentRoute) =>
        currentRoute.page === nextRoute.page && currentRoute.slug === nextRoute.slug
          ? currentRoute
          : nextRoute,
      )
    }
    const syncHash = () => updateRoute(parseRoute())
    const syncNavigation = (event) => {
      if (typeof event.detail === 'string') {
        updateRoute({ page: event.detail || 'home', slug: '' })
        return
      }

      updateRoute({
        page: event.detail?.page || 'home',
        slug: event.detail?.slug || '',
      })
    }
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

  useEffect(() => {
    let isActive = true

    getHygraphBlogContent(content)
      .then((hygraphContent) => {
        if (!isActive) return
        setBlogContent(hygraphContent)
        setActiveArticle(hygraphContent.articlePage)
        setCmsStatus('loaded')
      })
      .catch((error) => {
        if (!isActive) return
        console.warn('Hygraph content unavailable. Falling back to local content.', error)
        setBlogContent(content)
        setCmsStatus('fallback')
      })

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (page !== 'article') return

    const fallbackArticle =
      slug && blogContent.featured?.slug === slug ? blogContent.articlePage : blogContent.articlePage

    if (!slug) {
      setActiveArticle(fallbackArticle)
      return
    }

    let isActive = true

    getHygraphArticle(slug)
      .then((article) => {
        if (!isActive) return
        setActiveArticle(article || fallbackArticle)
      })
      .catch((error) => {
        if (!isActive) return
        console.warn('Hygraph article unavailable. Falling back to current article.', error)
        setActiveArticle(fallbackArticle)
      })

    return () => {
      isActive = false
    }
  }, [blogContent, page, slug])

  const Page = useMemo(() => {
    switch (page) {
      case 'article':
        return () => <ArticlePage article={activeArticle} related={blogContent.related} />
      // case 'about':
      //   return () => <AboutPage about={blogContent.about} />
      case 'contact':
        return () => <ContactPage contact={blogContent.contact} />
      case 'archive':
        return () => <ArchivePage articles={blogContent.articles} featured={blogContent.featured} />
      default:
        return () => (
          <HomePage
            articles={blogContent.articles}
            featured={blogContent.featured}
            newsletter={blogContent.newsletter}
          />
        )
    }
  }, [activeArticle, blogContent, page])

  return (
    <main className="min-h-screen bg-[#eef3f7] text-slate-700" data-cms={cmsStatus}>
      <Header navItems={blogContent.navigation} page={page} />
      <AnimatePresence mode="wait">
        <Page key={page} />
      </AnimatePresence>
      <Footer site={blogContent.site} />
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
