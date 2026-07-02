import { hygraphRequest } from './client'
import {
  adjacentPostsQuery,
  categoriesQuery,
  categoryPostsQuery,
  commentsQuery,
  featuredPostsQuery,
  postDetailsQuery,
  postsConnectionQuery,
  recentPostsQuery,
  similarPostsQuery,
} from './queries'
import {
  mapHygraphArticlePage,
  mapHygraphFeaturedPost,
  mapHygraphPostCard,
} from './mappers'

export async function getPosts() {
  const result = await hygraphRequest(postsConnectionQuery)
  return result.postsConnection.edges
}

export async function getRecentPosts() {
  const result = await hygraphRequest(recentPostsQuery)
  return result.posts
}

export async function getSimilarPosts(categories, slug) {
  const result = await hygraphRequest(similarPostsQuery, { slug, categories })
  return result.posts
}

export async function getCategories() {
  const result = await hygraphRequest(categoriesQuery)
  return result.categories
}

export async function getPostDetails(slug) {
  const result = await hygraphRequest(postDetailsQuery, { slug })
  return result.post
}

export async function getHygraphArticle(slug) {
  const post = await getPostDetails(slug)
  return post ? mapHygraphArticlePage(post) : null
}

export async function submitComment(obj) {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json()
}

export async function getComments(slug) {
  const result = await hygraphRequest(commentsQuery, { slug })
  return result.comments
}

export async function getFeaturedPosts() {
  const result = await hygraphRequest(featuredPostsQuery)
  return result.posts
}

export async function getAdjacentPosts(createdAt, slug) {
  const result = await hygraphRequest(adjacentPostsQuery, { slug, createdAt })
  return { next: result.next[0], previous: result.previous[0] }
}

export async function getCategoryPost(slug) {
  const result = await hygraphRequest(categoryPostsQuery, { slug })
  return result.postsConnection.edges
}

export async function getHygraphBlogContent(fallbackContent) {
  const edges = await getPosts()
  const posts = edges.map((edge) => edge.node)
  const featuredPost = posts[0]
  const articlePost = featuredPost ? await getPostDetails(featuredPost.slug) : null

  return {
    ...fallbackContent,
    featured: featuredPost
      ? mapHygraphFeaturedPost(featuredPost)
      : fallbackContent.featured,
    articles: posts.length > 1 ? posts.slice(1).map(mapHygraphPostCard) : fallbackContent.articles,
    articlePage: articlePost
      ? mapHygraphArticlePage(articlePost)
      : fallbackContent.articlePage,
    related: posts.length > 1 ? posts.slice(1, 4).map(mapHygraphPostCard) : fallbackContent.related,
  }
}
