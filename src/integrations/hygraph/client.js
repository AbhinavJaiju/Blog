const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT
const token = import.meta.env.VITE_HYGRAPH_TOKEN

export async function hygraphRequest(query, variables = {}) {
  if (!endpoint) {
    throw new Error('Missing VITE_HYGRAPH_ENDPOINT. Add it to your .env file.')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`Hygraph request failed with status ${response.status}`)
  }

  const payload = await response.json()

  if (payload.errors?.length) {
    const message = payload.errors.map((error) => error.message).join('; ')
    throw new Error(`Hygraph GraphQL error: ${message}`)
  }

  return payload.data
}
