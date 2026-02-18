export type NavbarIcon =
  | 'recipes'
  | 'nutrition'
  | 'forum'
  | 'mealPlans'
  | 'analytics'
  | 'orderGroceries'
  | 'dashboard'

export interface INavbarItem {
  icon: NavbarIcon
  label: string
  link: string
}
