import { ActivityLevel, NutritionGoal } from '@/__generated__/graphql'

export interface IProfileForm {
  userProfile: {
    fullName?: string | null
    birthYear?: number | null
    bio?: string | null
    gender?: 'FEMALE' | 'MALE' | null
  }
  fitnessProfile: {
    currentWeight?: string | null
    targetWeight?: number | null
    heightCm?: number | null
    armCm?: number | null
    chestCm?: number | null
    thighCm?: number | null
    waistCm?: number | null
    activityLevel?: ActivityLevel | null
    nutritionGoal?: NutritionGoal | null
  }
}

export interface IAccountForm {
  firstName?: string
  //   password?: string
  //   confirmPassword?: string
}
