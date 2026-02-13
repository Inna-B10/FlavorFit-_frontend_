'use client'

import { GetAllRecipesDocument } from '@/__generated__/graphql'
import { useQuery } from '@apollo/client/react'
import Image from 'next/image'

// import { useGetAllRecipesQuery } from '@/__generated__/graphql.hooks'

export default function Home() {

	const {data, loading, error } = useQuery(GetAllRecipesDocument, {variables: {input: {page: 1, limit: 10}}})

	console.log(data, error)

	return (
		<section className='flex flex-col gap-8 grow'>
			<h1>Home Page</h1>
			<div className='grow'></div>
			<Image src='/bg-images/healthy-eating-concept.png' alt='auth-background' width={501} height={453} className='w-50 lg:w-80 h-auto self-end hidden md:block' />
		</section>
	)
}
