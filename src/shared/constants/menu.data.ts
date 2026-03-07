import { BellIcon, BookUser, ListTodo, ShoppingCart, UserRoundCog } from 'lucide-react'
import { IconType } from 'react-icons'
import { BiHome } from 'react-icons/bi'
import { FaNutritionix } from 'react-icons/fa'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { ImStatsBars } from 'react-icons/im'
import { IoStorefrontOutline } from 'react-icons/io5'
import { LuLayoutDashboard } from 'react-icons/lu'
import { PiUsersFour } from 'react-icons/pi'
import { TbShoppingBagCheck } from 'react-icons/tb'
import { PUBLIC_PAGES, USER_PAGES } from '../config/pages.config'
import { INavbarItem, TNavbarIcon } from '../types/navbar.types'
import { IUserMenuItem, TUserMenuIcon } from '../types/user-menu.types'

export const NAVBAR_PUBLIC_DATA: INavbarItem[] = [
  {
    icon: 'home',
    label: 'Home',
    link: PUBLIC_PAGES.HOME
  },
  {
    icon: 'nutrition',
    label: 'Nutrition',
    link: PUBLIC_PAGES.NUTRITION
  },
  {
    icon: 'forum',
    label: 'Forum',
    link: PUBLIC_PAGES.FORUM
  }
]

export const NAVBAR_USER_DATA: INavbarItem[] = [
  {
    icon: 'mealPlans',
    label: 'Meal plans',
    link: USER_PAGES.MEAL_PLANS
  },
  {
    icon: 'orderGroceries',
    label: 'Order groceries',
    link: USER_PAGES.ORDER_GROCERIES
  },
  {
    icon: 'analytics',
    label: 'Analytics',
    link: USER_PAGES.ANALYTICS
  },
  {
    icon: 'dashboard',
    label: 'Dashboard',
    link: USER_PAGES.DASHBOARD
  }
]

export const NAVBAR_MENU_ICONS: Record<TNavbarIcon, IconType> = {
  home: BiHome,
  nutrition: FaNutritionix,
  forum: PiUsersFour,
  mealPlans: GiForkKnifeSpoon,
  analytics: ImStatsBars,
  orderGroceries: IoStorefrontOutline,
  dashboard: LuLayoutDashboard
}

//* -------------------------------- USER MENU ------------------------------- */
export const USER_MENU_DATA: IUserMenuItem[] = [
  { icon: 'account', label: 'Account', link: USER_PAGES.ACCOUNT },
  { icon: 'profile', label: 'Profile', link: USER_PAGES.PROFILE },
  { icon: 'notifications', label: 'Notifications', link: USER_PAGES.NOTIFICATIONS },
  { icon: 'shoppingList', label: 'Shopping list', link: USER_PAGES.SHOPPING_LIST },
  { icon: 'cart', label: 'Cart', link: USER_PAGES.CART },
  { icon: 'orders', label: 'Orders', link: USER_PAGES.ORDERS() }
]

export const USER_MENU_ICONS: Record<TUserMenuIcon, IconType> = {
  account: UserRoundCog,
  profile: BookUser,
  notifications: BellIcon,
  shoppingList: ListTodo,
  cart: ShoppingCart,
  orders: TbShoppingBagCheck
}
