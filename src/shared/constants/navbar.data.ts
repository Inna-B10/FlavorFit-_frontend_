import { PUBLIC_PAGES, USER_PAGES } from '../config/pages.config'
import { INavbarItem } from '../types/navbar.types'

export const NAVBAR_DATA: INavbarItem[] = [
  // {
  // 	icon: RxHome,
  // 	//BiHome, //HiOutlineHome, //TiHomeOutline, //RxHome,
  // 	label: 'Home',
  // 	link: PAGE.HOME
  // },
  {
    icon: 'forum',
    //PiUsersThree,
    label: 'Forum',
    link: PUBLIC_PAGES.FORUM
  },
  {
    icon: 'recipes',
    //PiBookOpenText, //MdMenuBook,
    label: 'Recipes',
    link: PUBLIC_PAGES.HOME
  },
  {
    icon: 'nutrition',
    //BsCalendar3, //ImCalendar, //GiForkKnifeSpoon,
    label: 'Nutrition',
    link: PUBLIC_PAGES.NUTRITION
  }
]

export const USER_NAVBAR_DATA: INavbarItem[] = [
  {
    icon: 'mealPlans',
    //ImCalendar,
    label: 'Meal plans',
    link: USER_PAGES.MEAL_PLANS
  },
  {
    icon: 'orderGroceries',
    //LiaStoreAltSolid, //IoStorefrontOutline
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
