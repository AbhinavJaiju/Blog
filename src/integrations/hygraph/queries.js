export const homeContentQuery = /* GraphQL */ `
  query HomeContent {
    articles(orderBy: date_DESC, first: 6) {
      title
      slug
      category
      readTime
      date
      excerpt
      coverImage {
        url
      }
    }
    siteSettings(first: 1) {
      title
      copyright
    }
  }
`

export const articleBySlugQuery = /* GraphQL */ `
  query ArticleBySlug($slug: String!) {
    article(where: { slug: $slug }) {
      title
      slug
      category
      readTime
      date
      excerpt
      body
      coverImage {
        url
      }
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`

export const pageBySlugQuery = /* GraphQL */ `
  query PageBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      slug
      headline
      intro
      image {
        url
      }
    }
  }
`
