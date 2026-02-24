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
  readonly PROFILE = '/user/profile'
  readonly ACCOUNT = '/user/account'
  readonly MEAL_PLANS = '/user/meal-plans'
  readonly ANALYTICS = '/user/analytics'
  readonly ORDER_GROCERIES = '/user/order-groceries' //Cart?
  readonly DASHBOARD = '/user/dashboard'
  readonly SHOPPING_LIST = '/user/shopping-list'
  readonly CART = '/user/cart'

  ORDERS(path?: string) {
    return `/user/orders${path ? `/${path}` : ''}`
  }
  readonly NOTIFICATION = '/user/notification'
}

export const USER_PAGES = new UserPages()
