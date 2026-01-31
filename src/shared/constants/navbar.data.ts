import { PAGE } from '../config/public-pages.config'
import { USER_PAGE } from '../config/user-pages.config'
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
		link: PAGE.FORUM
	},
	{
		icon: 'recipes',
		//PiBookOpenText, //MdMenuBook,
		label: 'Recipes',
		link: PAGE.HOME
	},
	{
		icon: 'nutrition',
		//BsCalendar3, //ImCalendar, //GiForkKnifeSpoon,
		label: 'Nutrition',
		link: PAGE.NUTRITION
	}
]

export const USER_NAVBAR_DATA: INavbarItem[] = [
	{
		icon: 'mealPlans',
		//ImCalendar,
		label: 'Meal plans',
		link: USER_PAGE.MEAL_PLANS
	},
	{
		icon: 'orderGroceries',
		//LiaStoreAltSolid, //IoStorefrontOutline
		label: 'Order groceries',
		link: USER_PAGE.ORDER_GROCERIES
	},
	{
		icon: 'analytics',
		label: 'Analytics',
		link: USER_PAGE.ANALYTICS
	},
	{
		icon: 'dashboard',
		label: 'Dashboard',
		link: USER_PAGE.DASHBOARD
	}
]
