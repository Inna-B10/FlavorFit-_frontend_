import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: 'src/shared/graphql/graphql-schema.json',
  documents: ['src/shared/graphql/**/*.graphql']
}

export default config
