import { gql, request } from 'graphql-request'

const endpoint =
  import.meta.env.VITE_HYGRAPH_ENDPOINT || import.meta.env.VITE_GRAPHCMS_ENDPOINT
const token = import.meta.env.VITE_HYGRAPH_TOKEN

export { gql }

export async function hygraphRequest(query, variables = {}) {
  if (!endpoint) {
    throw new Error('Missing VITE_HYGRAPH_ENDPOINT. Add it to your .env file.')
  }

  return request({
    url: endpoint,
    document: query,
    variables,
    requestHeaders: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
}
