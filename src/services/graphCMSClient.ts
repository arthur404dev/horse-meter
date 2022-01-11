import { GraphQLClient } from "graphql-request"

if (!process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT) {
  throw new Error("NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined")
}
if (!process.env.GRAPHCMS_TOKEN) {
  throw new Error("GRAPHCMS_TOKEN is not defined")
}

export default new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})
