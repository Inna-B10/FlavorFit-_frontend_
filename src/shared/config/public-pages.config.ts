class PublicPage {
	HOME = '/'
	NUTRITION = '/nutrition'
	FORUM = '/forum'

	SEARCH(searchTerm: string) {
		return `/search?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
