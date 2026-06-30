# Hygraph Integration

This folder is the CMS boundary for The Perspective.

Add these values to a local `.env` file when you are ready to connect Hygraph:

```bash
VITE_HYGRAPH_ENDPOINT=https://api-us-east-1-shared-usea1-02.hygraph.com/v2/YOUR_PROJECT_ID/master
VITE_HYGRAPH_TOKEN=
```

`VITE_HYGRAPH_TOKEN` is optional for public content APIs. Use it only if your Hygraph project requires authenticated reads.

Suggested content models:

- `Article`: `title`, `slug`, `category`, `readTime`, `date`, `excerpt`, `coverImage`, `body`
- `Author`: `name`, `avatar`
- `SiteSettings`: `title`, `copyright`
- `Page`: `slug`, `headline`, `intro`, `image`

Use `queries.js` for GraphQL query strings, `client.js` for request handling, and `mappers.js` to convert Hygraph responses into the shape expected by the existing React components.
