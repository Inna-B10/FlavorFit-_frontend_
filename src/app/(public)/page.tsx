'use client'

import { GetAllRecipesDocument } from '@/__generated__/graphql'
import { useQuery } from '@apollo/client/react'

// import { useGetAllRecipesQuery } from '@/__generated__/graphql.hooks'

export default function Home() {

	const {data, loading, error } = useQuery(GetAllRecipesDocument, {variables: {input: {page: 1, limit: 10}}})

	console.log(data, error)

	return <div>Home Page</div>
}
