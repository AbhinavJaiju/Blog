import { hygraphRequest } from './client'
import { articleBySlugQuery, homeContentQuery, pageBySlugQuery } from './queries'
import {
  mapHygraphArticle,
  mapHygraphArticlePage,
  mapHygraphSiteSettings,
} from './mappers'

export async function getHygraphHomeContent() {
  const data = await hygraphRequest(homeContentQuery)

  return {
    articles: data.articles.map(mapHygraphArticle),
    site: mapHygraphSiteSettings(data.siteSettings?.[0]),
  }
}

export async function getHygraphArticle(slug) {
  const data = await hygraphRequest(articleBySlugQuery, { slug })
  return data.article ? mapHygraphArticlePage(data.article) : null
}

export async function getHygraphPage(slug) {
  const data = await hygraphRequest(pageBySlugQuery, { slug })
  return data.page || null
}
