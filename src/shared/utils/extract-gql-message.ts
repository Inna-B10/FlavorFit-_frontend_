type AnyObj = Record<string, any>

export function extractGqlMessage(err: unknown): string {
	const e = err as AnyObj

	// 1) Apollo v4: CombinedGraphQLErrors -> { errors: GraphQLError[] }
	const combined = e?.errors
	if (Array.isArray(combined) && combined.length) {
		const first = combined[0]
		const msgArr = first?.extensions?.originalError?.message
		if (Array.isArray(msgArr) && msgArr.length) return String(msgArr[0])
		if (typeof msgArr === 'string') return msgArr
		if (typeof first?.message === 'string') return first.message
	}

	// 2) fallback: older shape
	const gql = e?.graphQLErrors
	if (Array.isArray(gql) && gql.length) {
		const first = gql[0]
		const msgArr = first?.extensions?.originalError?.message
		if (Array.isArray(msgArr) && msgArr.length) return String(msgArr[0])
		if (typeof msgArr === 'string') return msgArr
		if (typeof first?.message === 'string') return first.message
	}

	// 3) network / fetch
	const msg = typeof e?.message === 'string' ? e.message : ''
	if (msg.includes('Failed to fetch')) return 'Server is unavailable'

	return msg || 'Something went wrong'
}
