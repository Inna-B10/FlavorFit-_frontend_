import { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

// generate schema — backend needed
// npm run codegen:snapshot

const endpoint = process.env.BACKEND_GRAPHQL_URL
if (!endpoint) throw new Error('BACKEND_GRAPHQL_URL is not defined')

const config: CodegenConfig = {
  overwrite: true,
  schema: endpoint,
  generates: {
    'src/shared/graphql/graphql-schema.json': {
      plugins: ['introspection']
    }
  }
}

export default config
