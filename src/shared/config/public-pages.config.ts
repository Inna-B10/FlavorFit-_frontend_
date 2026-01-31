class PublicPage {
	HOME = '/'
	NUTRITION = '/nutrition'
	FORUM = '/forum'
	CONTACT = '/contact'

	SEARCH(searchTerm: string) {
		return `/search?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
