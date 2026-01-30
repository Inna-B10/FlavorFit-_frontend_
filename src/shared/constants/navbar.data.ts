import { BiBookBookmark } from 'react-icons/bi'
import { FaNutritionix } from 'react-icons/fa'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { ImStatsBars } from 'react-icons/im'
import { IoStorefrontOutline } from 'react-icons/io5'
import { LuLayoutDashboard } from 'react-icons/lu'
import { PiUsersFour } from 'react-icons/pi'
import { PAGE } from '../config/pages'
import { INavbarItem } from '../types/navbar.types'

export const NAVBAR_DATA: INavbarItem[] = [
	// {
	// 	icon: RxHome,
	// 	//BiHome, //HiOutlineHome, //TiHomeOutline, //RxHome,
	// 	label: 'Home',
	// 	link: PAGE.HOME
	// },
	{
		icon: BiBookBookmark, //PiBookOpenText, //MdMenuBook,
		label: 'Recipes',
		link: PAGE.HOME
	},
	{
		icon: FaNutritionix,
		//BsCalendar3, //ImCalendar, //GiForkKnifeSpoon,
		label: 'Nutrition',
		link: PAGE.NUTRITION
	},
	{
		icon: PiUsersFour,
		//PiUsersThree,
		label: 'Forum',
		link: PAGE.FORUM
	},

	{
		icon: GiForkKnifeSpoon,
		//ImCalendar,
		label: 'Meal plans',
		link: PAGE.MEAL_PLANS
	},
	{
		icon: ImStatsBars,
		label: 'Analytics',
		link: PAGE.ANALYTICS
	},
	{
		icon: IoStorefrontOutline,
		//LiaStoreAltSolid, //IoStorefrontOutline
		label: 'Order groceries',
		link: PAGE.ORDER_GROCERIES
	},
	{
		icon: LuLayoutDashboard,
		label: 'Dashboard',
		link: PAGE.DASHBOARD
	}
]
