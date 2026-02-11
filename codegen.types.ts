import { CodegenConfig } from '@graphql-codegen/cli'

// generate types, hooks... — backend not needed
//npm run codegen or npm run codegen:all

const config: CodegenConfig = {
	overwrite: true,
	ignoreNoDocuments: true,

	//NestJS GraphQL endpoint
	schema: 'src/shared/graphql/graphql-schema.json',

	//where .graphql files live
	documents: ['src/shared/graphql/**/*.graphql'],

	generates: {
		//server-safe types (NO Apollo imports)
		'src/__generated__/graphql.types.ts': {
			plugins: ['typescript', 'typescript-operations'],
			config: {
				enumsAsTypes: true,
				skipTypename: false,

				useTypeImports: true
			}
		},

		//2. client-only hooks (Apollo imports live here)
		'src/__generated__/graphql.hooks.ts': {
			plugins: ['typescript-react-apollo'],
			config: {
				//use Apollo v3 (modern)
				reactApolloVersion: 3,

				//generate React hooks only (no HOCs, no components)
				withHooks: true,
				withHOC: false,
				withComponent: false,

				// Apollo Client v4 exports hooks + skipToken from this entry
				apolloReactHooksImportFrom: '@apollo/client/react',

				useTypeImports: true,

				withSuspense: false

				//optional, but often nicer DX: consistent nullability
				// maybeValue: 'T | null'
			}
		},
		'src/shared/graphql/graphql-schema.json': {
			plugins: ['introspection']
		}
	}
}

export default config
