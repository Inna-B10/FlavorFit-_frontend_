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
		//should be a FILE, not a folder
		'src/__generated__/graphql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				enumsAsTypes: true,
				skipTypename: false,

				//use Apollo v3 (modern)
				apolloversion: 3,

				//generate React hooks only (no HOCs, no components)
				withHooks: true,
				withHOC: false,
				withComponent: false,

				//helps keep imports type-only where possible
				useTypeImports: true,

				//optional, but often nicer DX: consistent nullability
				maybeValue: 'T | null'
			}
		},
		'src/shared/graphql/graphql-schema.json': {
			plugins: ['introspection']
		}
	}
}

export default config
