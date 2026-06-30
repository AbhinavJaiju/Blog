export function mapHygraphArticle(article) {
  return {
    title: article.title,
    category: article.category,
    readTime: article.readTime,
    date: formatHygraphDate(article.date),
    excerpt: article.excerpt,
    image: article.coverImage?.url || '',
    slug: article.slug,
  }
}

export function mapHygraphArticlePage(article) {
  return {
    title: article.title,
    category: article.category,
    readTime: article.readTime,
    author: article.author?.name || 'The Perspective',
    date: formatHygraphDate(article.date),
    authorImage: article.author?.avatar?.url || '',
    heroImage: article.coverImage?.url || '',
    heroAlt: article.title,
    paragraphs: splitBodyIntoParagraphs(article.body),
    sections: [],
    quote: '',
  }
}

export function mapHygraphSiteSettings(settings) {
  return {
    title: settings?.title || 'The Perspective',
    copyright:
      settings?.copyright || '© 2024 Editorial Minimalism. Crafted for the thoughtful reader.',
  }
}

function splitBodyIntoParagraphs(body = '') {
  return body
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function formatHygraphDate(date) {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}
