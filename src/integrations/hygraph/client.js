import { gql, request } from 'graphql-request'

const endpoint =
  import.meta.env.VITE_HYGRAPH_ENDPOINT || import.meta.env.VITE_GRAPHCMS_ENDPOINT
const mutationEndpoint =
  import.meta.env.VITE_HYGRAPH_MUTATION_ENDPOINT || deriveMutationEndpoint(endpoint)
const token = import.meta.env.VITE_HYGRAPH_TOKEN

export { gql }

export async function hygraphRequest(query, variables = {}, options = {}) {
  const requestEndpoint = options.mutation ? mutationEndpoint : endpoint

  if (!requestEndpoint) {
    throw new Error('Missing VITE_HYGRAPH_ENDPOINT. Add it to your .env file.')
  }

  return request({
    url: requestEndpoint,
    document: query,
    variables,
    requestHeaders: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
}

function deriveMutationEndpoint(readEndpoint) {
  if (!readEndpoint?.includes('.cdn.hygraph.com/content/')) return readEndpoint

  const url = new URL(readEndpoint)
  const region = url.hostname.replace('.cdn.hygraph.com', '')
  const projectPath = url.pathname.replace('/content/', '/v2/')

  return `https://api-${region}.hygraph.com${projectPath}`
}
