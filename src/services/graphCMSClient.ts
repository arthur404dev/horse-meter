import { GraphQLClient } from "graphql-request"
import { environment } from "../config"

export default new GraphQLClient(environment.graphcms.endpoint, {
  headers: {
    Authorization: `Bearer ${environment.graphcms.token}`,
  },
})
