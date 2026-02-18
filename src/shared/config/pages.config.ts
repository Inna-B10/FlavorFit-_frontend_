class PublicPages {
  readonly HOME = '/'
  readonly NUTRITION = '/nutrition'
  readonly FORUM = '/forum'
  readonly CONTACT = '/contact'

  SEARCH(searchTerm: string) {
    return `/search?term=${searchTerm}`
  }

  private readonly AUTH = '/auth'
  readonly LOGIN = `${this.AUTH}/login`
  readonly REGISTRATION = `${this.AUTH}/registration`
}

export const PUBLIC_PAGES = new PublicPages()

class UserPages {
  readonly PROFILE = '/profile'
  readonly ACCOUNT = '/account'
  readonly MEAL_PLANS = '/meal-plans'
  readonly ANALYTICS = '/analytics'
  readonly ORDER_GROCERIES = '/order-groceries' //Cart?
  readonly DASHBOARD = '/dashboard'
  readonly SHOPPING_LIST = '/shopping-list'
  // readonly CART = '/cart'

  ORDERS(path?: string) {
    return `/orders${path ? `/${path}` : ''}`
  }
  readonly NOTIFICATION = '/notification'
}

export const USER_PAGES = new UserPages()
