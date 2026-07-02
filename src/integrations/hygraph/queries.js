import { gql } from './client'

export const postsConnectionQuery = gql`
  query MyQuery {
    postsConnection(orderBy: createdAt_DESC) {
      edges {
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            stage
            slug
          }
        }
      }
    }
  }
`

export const recentPostsQuery = gql`
  query GetPostDetails {
    posts(orderBy: createdAt_ASC, last: 3) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`

export const similarPostsQuery = gql`
  query GetPostDetails($slug: String!, $categories: [String!]) {
    posts(
      where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`

export const categoriesQuery = gql`
  query GetCategories {
    categories {
      name
      slug
    }
  }
`

export const postDetailsQuery = gql`
  query GetPostDetails($slug: String!) {
    post(where: { slug: $slug }) {
      title
      excerpt
      featuredImage {
        url
      }
      author {
        name
        bio
        photo {
          url
        }
      }
      createdAt
      slug
      content {
        raw
      }
      categories {
        name
        slug
      }
    }
  }
`

export const commentsQuery = gql`
  query GetComments($slug: String!) {
    comments(where: { post: { slug: $slug } }) {
      name
      createdAt
      comment
    }
  }
`

export const featuredPostsQuery = gql`
  query GetCategoryPost {
    posts(where: { featuredPost: true }) {
      author {
        name
        photo {
          url
        }
      }
      featuredImage {
        url
      }
      title
      slug
      createdAt
    }
  }
`

export const adjacentPostsQuery = gql`
  query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
    next: posts(
      first: 1
      orderBy: createdAt_ASC
      where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
    previous: posts(
      first: 1
      orderBy: createdAt_DESC
      where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`

export const categoryPostsQuery = gql`
  query GetCategoryPost($slug: String!) {
    postsConnection(where: { categories_some: { slug: $slug } }) {
      edges {
        cursor
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
`
