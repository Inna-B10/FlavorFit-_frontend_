import { CodegenConfig } from '@graphql-codegen/cli'

// generate types, hooks... — backend not needed
//npm run codegen

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,

  //NestJS GraphQL endpoint
  schema: 'src/shared/graphql/graphql-schema.json',

  //where .graphql files live
  documents: ['src/shared/graphql/**/*.graphql', 'src/features/**/*.graphql'],

  generates: {
    //1. client preset: TypedDocumentNode + удобные артефакты
    'src/__generated__/': {
      preset: 'client',
      presetConfig: {
        skipTypename: true,
        fragmentMasking: false
      },
      config: {
        useTypeImports: true,
        enumsAsConst: true
        // skipTypename: false,
      }
    },

    //2. server-safe types (NO Apollo imports)
    'src/__generated__/graphql.types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        enumsAsConst: true,
        skipTypename: false,
        useTypeImports: true
      }
    },
    'src/shared/graphql/graphql-schema.json': {
      plugins: ['introspection']
    }
  }
}

export default config
