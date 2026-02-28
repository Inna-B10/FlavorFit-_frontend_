class PublicPages {
  readonly HOME = '/'
  readonly NUTRITION = '/nutrition'
  readonly FORUM = '/forum'
  readonly CONTACT = '/contact'

  SEARCH(searchTerm: string) {
    return `/search?term=${searchTerm}`
  }
}

export const PUBLIC_PAGES = new PublicPages()

class AuthPages {
  private readonly AUTH = '/auth'
  readonly LOGIN = `${this.AUTH}/login`
  readonly REGISTRATION = `${this.AUTH}/registration`
  readonly RESET_PASSWORD = `${this.AUTH}/reset-password`
  readonly REQUEST_RESET_PASSWORD = `${this.AUTH}/request-reset-password`
  readonly VERIFY_EMAIL = `${this.AUTH}/verify-email`
  readonly REQUEST_VERIFICATION_EMAIL = `${this.AUTH}/request-verification-email`
}

export const AUTH_PAGES = new AuthPages()

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
