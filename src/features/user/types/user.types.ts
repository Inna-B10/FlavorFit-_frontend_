import { ActivityLevel, Gender, NutritionGoal } from '@/__generated__/graphql.types'

export interface IProfileForm {
  fullName?: string
  gender?: Gender
  birthYear?: number
  bio?: string

  currentWeight?: number
  targetWeight?: number
  armCm?: number
  chestCm?: number
  heightCm?: number
  thighCm?: number
  waistCm?: number
  updatedAt?: string

  activityLevel?: ActivityLevel
  nutritionGoal?: NutritionGoal
}

export interface IAccountForm {
  firstName?: string
  avatarUrl?: string

  password?: string
  confirmPassword?: string
}
