export type TUserMenuIcon =
  | 'account'
  | 'profile'
  | 'notifications'
  | 'shoppingList'
  | 'cart'
  | 'orders'

export interface IUserMenuItem {
  icon: TUserMenuIcon
  label: string
  link: string
}
