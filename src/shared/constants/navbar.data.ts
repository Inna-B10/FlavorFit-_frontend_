import { BiBookBookmark } from 'react-icons/bi'
import { FaNutritionix } from 'react-icons/fa'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { ImStatsBars } from 'react-icons/im'
import { IoStorefrontOutline } from 'react-icons/io5'
import { PiUsersFour } from 'react-icons/pi'
import { RxHome } from 'react-icons/rx'
import { PAGE } from '../config/pages'
import { INavbarItem } from '../types/navbar.types'

export const NAVBAR_DATA: INavbarItem[] = [
	{
		icon: RxHome,
		//BiHome, //HiOutlineHome, //TiHomeOutline, //RxHome,
		label: 'Home',
		link: PAGE.HOME
	},
	{
		icon: GiForkKnifeSpoon,
		//ImCalendar,
		label: 'Meal plans',
		link: PAGE.MEAL_PLANS
	},
	{
		icon: FaNutritionix,
		//BsCalendar3, //ImCalendar, //GiForkKnifeSpoon,
		label: 'Nutrition',
		link: PAGE.NUTRITION
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
		icon: BiBookBookmark, //PiBookOpenText, //MdMenuBook,
		label: 'Recipes',
		link: PAGE.RECIPES
	},
	{
		icon: PiUsersFour,
		//PiUsersThree,
		label: 'Forum',
		link: PAGE.FORUM
	}
]
