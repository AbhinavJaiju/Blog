export function mapHygraphArticle(article) {
  return {
    title: article.title,
    category: article.category || article.categories?.[0]?.name || 'essay',
    readTime: article.readTime || '8 min read',
    date: formatHygraphDate(article.date),
    excerpt: article.excerpt,
    image: article.coverImage?.url || article.featuredImage?.url || '',
    slug: article.slug,
  }
}

export function mapHygraphArticlePage(article) {
  const contentBlocks = normalizeRichTextBlocks(article.content?.raw)
  const paragraphs = contentBlocks?.map((block) => block.children.map((child) => child.text).join('')) || [
    article.excerpt || '',
    'This article is managed in Hygraph. Add rich text content to expand the full reading experience.',
    '',
    '',
  ]

  return {
    title: article.title,
    category: article.category || article.categories?.[0]?.name || 'essay',
    readTime: article.readTime || '8 min read',
    author: article.author?.name || 'The Perspective',
    date: formatHygraphDate(article.createdAt || article.date),
    authorImage: article.author?.photo?.url || article.author?.avatar?.url || '',
    heroImage: article.coverImage?.url || article.featuredImage?.url || '',
    heroAlt: article.title,
    excerpt: article.excerpt || '',
    paragraphs,
    contentBlocks,
    sections: ['The Perspective', 'Further Reading'],
    quote: article.excerpt || 'A focused perspective from the archive.',
    slug: article.slug,
  }
}

export function mapHygraphSiteSettings(settings) {
  return {
    title: settings?.title || 'The Perspective',
    copyright:
      settings?.copyright || '© 2024 Editorial Minimalism. Crafted for the thoughtful reader.',
  }
}

export function mapHygraphPostCard(post) {
  return {
    title: post.title,
    category: post.categories?.[0]?.name || 'essay',
    readTime: estimateReadTime(post.excerpt),
    date: formatHygraphDate(post.createdAt),
    excerpt: post.excerpt || '',
    image: post.featuredImage?.url || '',
    slug: post.slug,
  }
}

export function mapHygraphFeaturedPost(post) {
  return {
    title: post.title,
    category: post.categories?.[0]?.name || 'philosophy',
    date: formatHygraphDate(post.createdAt),
    excerpt: post.excerpt || '',
    image: post.featuredImage?.url || '',
    imageAlt: post.title,
    slug: post.slug,
  }
}

function normalizeRichTextBlocks(raw) {
  if (!raw?.children?.length) return null

  const blocks = raw.children
    .map((node) => {
      if (!node.children?.length) return null

      const children = node.children
        .map((child) => ({
          text: child.text || '',
          bold: Boolean(child.bold),
          italic: Boolean(child.italic),
          underline: Boolean(child.underline),
        }))
        .filter((child) => child.text.trim())

      if (!children.length) return null

      return {
        type: node.type || 'paragraph',
        children,
      }
    })
    .filter(Boolean)

  return blocks.length ? blocks : null
}

function formatHygraphDate(date) {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

function estimateReadTime(text = '') {
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 180))
  return `${minutes} min read`
}
