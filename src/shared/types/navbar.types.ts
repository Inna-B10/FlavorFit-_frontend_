export type TNavbarIcon =
  | 'home'
  | 'nutrition'
  | 'forum'
  | 'mealPlans'
  | 'analytics'
  | 'orderGroceries'
  | 'dashboard'

export interface INavbarItem {
  icon: TNavbarIcon
  label: string
  link: string
}
