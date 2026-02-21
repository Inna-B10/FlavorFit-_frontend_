/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** Decimal custom scalar type */
  Decimal: { input: any; output: any; }
};

export const ActivityLevel = {
  Active: 'ACTIVE',
  LightlyActive: 'LIGHTLY_ACTIVE',
  ModeratelyActive: 'MODERATELY_ACTIVE',
  Sedentary: 'SEDENTARY',
  VeryActive: 'VERY_ACTIVE'
} as const;

export type ActivityLevel = typeof ActivityLevel[keyof typeof ActivityLevel];
export type AddManyItemsToCartInputInput = {
  listId: Scalars['String']['input'];
};

export type AddOneItemToCartInput = {
  listItemId: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  user: UserModel;
};

export type CartItemModel = {
  __typename?: 'CartItemModel';
  cartItemId: Scalars['String']['output'];
  goodsCount?: Maybe<Scalars['Decimal']['output']>;
  product: ProductModel;
  productVariant?: Maybe<ProductVariantModel>;
  requiredByRecipes: Array<CartItemRequiredAmountModel>;
  requirements: Array<CartItemRequirementModel>;
};

export type CartItemRequiredAmountModel = {
  __typename?: 'CartItemRequiredAmountModel';
  recipeUnit: RecipeUnit;
  requiredAmount: Scalars['Decimal']['output'];
};

export type CartItemRequirementModel = {
  __typename?: 'CartItemRequirementModel';
  cartItemRequirementId: Scalars['String']['output'];
  listItem: ShoppingListItemForCartModel;
};

export type CartModel = {
  __typename?: 'CartModel';
  cartId: Scalars['String']['output'];
  cartItems: Array<CartItemModel>;
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CommentModel = {
  __typename?: 'CommentModel';
  commentId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  message: Scalars['String']['output'];
  recipeId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type CourierModel = {
  __typename?: 'CourierModel';
  courierId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type CreateCommentInput = {
  message: Scalars['String']['input'];
  recipeId: Scalars['String']['input'];
};

export type CreateIngredientInput = {
  ingredientNote?: InputMaybe<Scalars['String']['input']>;
  productIconUrl?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Decimal']['input'];
  recipeUnit: RecipeUnit;
};

export type CreateOrderInput = {
  orderNote?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
  productVariants?: InputMaybe<Array<CreateProductVariantInput>>;
  recipeUnit: RecipeUnit;
};

export type CreateProductVariantInput = {
  label: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  pricingAmount: Scalars['Decimal']['input'];
  pricingUnit: SaleUnit;
  variantNote?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRecipeInput = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  cookingTime?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  difficulty: Difficulty;
  dishType: DishType;
  ingredients: Array<CreateIngredientInput>;
  nutritionFacts?: InputMaybe<NutritionFactsInput>;
  recipeSteps?: InputMaybe<Array<CreateRecipeStepInput>>;
  slug: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateRecipeStepInput = {
  content: Scalars['String']['input'];
  stepNumber?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export const Difficulty = {
  Easy: 'EASY',
  Hard: 'HARD',
  Medium: 'MEDIUM'
} as const;

export type Difficulty = typeof Difficulty[keyof typeof Difficulty];
export const DishType = {
  Baking: 'BAKING',
  Dessert: 'DESSERT',
  Drink: 'DRINK',
  Main: 'MAIN',
  Salad: 'SALAD',
  Snack: 'SNACK',
  Soup: 'SOUP'
} as const;

export type DishType = typeof DishType[keyof typeof DishType];
export type FitnessProfileModel = {
  __typename?: 'FitnessProfileModel';
  activityLevel?: Maybe<ActivityLevel>;
  armCm?: Maybe<Scalars['Int']['output']>;
  chestCm?: Maybe<Scalars['Int']['output']>;
  currentWeight?: Maybe<Scalars['Decimal']['output']>;
  heightCm?: Maybe<Scalars['Int']['output']>;
  nutritionGoal?: Maybe<NutritionGoal>;
  targetWeight?: Maybe<Scalars['Int']['output']>;
  thighCm?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  waistCm?: Maybe<Scalars['Int']['output']>;
};

export type FitnessProfileUpdateInput = {
  activityLevel?: InputMaybe<ActivityLevel>;
  armCm?: InputMaybe<Scalars['Int']['input']>;
  chestCm?: InputMaybe<Scalars['Int']['input']>;
  currentWeight?: InputMaybe<Scalars['Decimal']['input']>;
  heightCm?: InputMaybe<Scalars['Int']['input']>;
  nutritionGoal?: InputMaybe<NutritionGoal>;
  targetWeight?: InputMaybe<Scalars['Int']['input']>;
  thighCm?: InputMaybe<Scalars['Int']['input']>;
  waistCm?: InputMaybe<Scalars['Int']['input']>;
};

export type FullProfileUpdateInput = {
  fitnessProfile?: InputMaybe<FitnessProfileUpdateInput>;
  profile?: InputMaybe<UserProfileUpdateInput>;
};

export const Gender = {
  Female: 'FEMALE',
  Male: 'MALE'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];
export type IngredientModel = {
  __typename?: 'IngredientModel';
  ingredientId: Scalars['String']['output'];
  ingredientNote?: Maybe<Scalars['String']['output']>;
  product: ProductModel;
  productId: Scalars['String']['output'];
  quantity: Scalars['Decimal']['output'];
  recipeUnit: RecipeUnit;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addManyItemsToCartInput: CartModel;
  addOneItemToCart: CartModel;
  createComment: CommentModel;
  createOrder: OrderModel;
  createProduct: ProductModel;
  createProductVariant: ProductVariantModel;
  createRecipe: RecipeModel;
  deleteComment: CommentModel;
  deleteOrder: Scalars['Boolean']['output'];
  deleteProduct: ProductModel;
  deleteProductVariant: ProductVariantModel;
  deleteRecipe: RecipeModel;
  deleteUser: Scalars['Boolean']['output'];
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  refreshRecipeInShoppingList: ShoppingListModel;
  register: RegisterResponse;
  removeAllCartItems: CartModel;
  removeCartItem: CartModel;
  removeRecipeFromShoppingList: ShoppingListModel;
  resendVerification: Scalars['Boolean']['output'];
  toggleLike: ToggleLikeResponse;
  updateCartItemPurchase: CartModel;
  updateComment: CommentModel;
  updateFullProfile: UserWithProfileModel;
  updateProduct: ProductModel;
  updateProductVariant: ProductVariantModel;
  updateRecipe: RecipeModel;
  updateUser: UserModel;
  verifyEmail: AuthResponse;
};


export type MutationAddManyItemsToCartInputArgs = {
  input: AddManyItemsToCartInputInput;
};


export type MutationAddOneItemToCartArgs = {
  input: AddOneItemToCartInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductVariantArgs = {
  input: CreateProductVariantInput;
  productId: Scalars['String']['input'];
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationDeleteOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String']['input'];
};


export type MutationDeleteProductVariantArgs = {
  productVariantId: Scalars['String']['input'];
};


export type MutationDeleteRecipeArgs = {
  recipeId: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRefreshRecipeInShoppingListArgs = {
  input: RecipeInShoppingListInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationRemoveCartItemArgs = {
  input: RemoveCartItemInput;
};


export type MutationRemoveRecipeFromShoppingListArgs = {
  input: RecipeInShoppingListInput;
};


export type MutationResendVerificationArgs = {
  email: Scalars['String']['input'];
};


export type MutationToggleLikeArgs = {
  recipeId: Scalars['String']['input'];
};


export type MutationUpdateCartItemPurchaseArgs = {
  input: UpdateCartItemPurchaseInput;
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['String']['input'];
  input: CreateCommentInput;
};


export type MutationUpdateFullProfileArgs = {
  input: FullProfileUpdateInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
  productId: Scalars['String']['input'];
};


export type MutationUpdateProductVariantArgs = {
  input: UpdateProductVariantInput;
  productVariantId: Scalars['String']['input'];
};


export type MutationUpdateRecipeArgs = {
  input: UpdateRecipeInput;
  recipeId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type NutritionFactsInput = {
  carbohydrates?: InputMaybe<Scalars['Decimal']['input']>;
  fats?: InputMaybe<Scalars['Decimal']['input']>;
  fiber?: InputMaybe<Scalars['Decimal']['input']>;
  protein?: InputMaybe<Scalars['Decimal']['input']>;
  sugar?: InputMaybe<Scalars['Decimal']['input']>;
};

export type NutritionFactsModel = {
  __typename?: 'NutritionFactsModel';
  carbohydrates?: Maybe<Scalars['Decimal']['output']>;
  factId: Scalars['String']['output'];
  fats?: Maybe<Scalars['Decimal']['output']>;
  fiber?: Maybe<Scalars['Decimal']['output']>;
  protein?: Maybe<Scalars['Decimal']['output']>;
  recipeId: Scalars['String']['output'];
  sugar?: Maybe<Scalars['Decimal']['output']>;
};

export const NutritionGoal = {
  GainMuscle: 'GAIN_MUSCLE',
  LoseWeight: 'LOSE_WEIGHT',
  Maintain: 'MAINTAIN'
} as const;

export type NutritionGoal = typeof NutritionGoal[keyof typeof NutritionGoal];
export type OrderItemModel = {
  __typename?: 'OrderItemModel';
  goodsCount: Scalars['Decimal']['output'];
  lineTotalAtPurchase: Scalars['Decimal']['output'];
  orderItemId: Scalars['String']['output'];
  priceAtPurchase: Scalars['Decimal']['output'];
  pricingAmountAtPurchase: Scalars['Decimal']['output'];
  pricingUnitAtPurchase: SaleUnit;
  productIconUrlAtPurchase: Scalars['String']['output'];
  productId?: Maybe<Scalars['String']['output']>;
  productNameAtPurchase: Scalars['String']['output'];
  productVariantLabelAtPurchase?: Maybe<Scalars['String']['output']>;
};

export type OrderModel = {
  __typename?: 'OrderModel';
  courier?: Maybe<CourierModel>;
  courierId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  orderId: Scalars['String']['output'];
  orderItems: Array<OrderItemModel>;
  orderNote?: Maybe<Scalars['String']['output']>;
  orderReference: Scalars['String']['output'];
  recipes: Array<RecipeModel>;
  status: OrderStatus;
  totalPrice: Scalars['Decimal']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export const OrderStatus = {
  Canceled: 'CANCELED',
  Completed: 'COMPLETED',
  OnWay: 'ON_WAY',
  Pending: 'PENDING',
  Processing: 'PROCESSING'
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
export type ProductModel = {
  __typename?: 'ProductModel';
  iconUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  productId: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  productVariants?: Maybe<Array<ProductVariantModel>>;
  recipeUnit: RecipeUnit;
};

export type ProductVariantModel = {
  __typename?: 'ProductVariantModel';
  label: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  pricingAmount: Scalars['Decimal']['output'];
  pricingUnit: SaleUnit;
  productVariantId: Scalars['String']['output'];
  variantNote?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  adminAllRecipes: Array<RecipeModel>;
  adminRecipeById: RecipeModel;
  allOrders: Array<OrderModel>;
  allOrdersByUserId: Array<OrderModel>;
  allProductVariants: Array<ProductVariantModel>;
  allProducts: Array<ProductModel>;
  allRecipes: Array<RecipeModel>;
  allUsers: Array<UserModel>;
  fullProfile: UserWithProfileModel;
  getAllShoppingLists: Array<ShoppingListModel>;
  getCartByUserId: CartModel;
  newTokens: AuthResponse;
  orderById: OrderModel;
  orderByReference: OrderModel;
  productById: ProductModel;
  productsWithoutVariants: Array<ProductModel>;
  recipeBySlug: RecipeModel;
  userByEmail: UserModel;
  userById: UserModel;
  variantById: ProductVariantModel;
};


export type QueryAdminRecipeByIdArgs = {
  recipeId: Scalars['String']['input'];
};


export type QueryAllOrdersByUserIdArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAllProductVariantsArgs = {
  productId: Scalars['String']['input'];
};


export type QueryAllRecipesArgs = {
  input: RecipesQueryInput;
};


export type QueryOrderByIdArgs = {
  orderId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrderByReferenceArgs = {
  orderReference: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryRecipeBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVariantByIdArgs = {
  variantId: Scalars['String']['input'];
};

export type RecipeInShoppingListInput = {
  listId: Scalars['String']['input'];
  recipeId: Scalars['String']['input'];
};

export type RecipeModel = {
  __typename?: 'RecipeModel';
  calories?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Array<CommentModel>>;
  cookingTime?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  difficulty: Difficulty;
  dishType: DishType;
  ingredients?: Maybe<Array<IngredientModel>>;
  ingredientsVersion: Scalars['Int']['output'];
  likesCount: Scalars['Int']['output'];
  nutritionFacts?: Maybe<NutritionFactsModel>;
  recipeId: Scalars['String']['output'];
  recipeSteps?: Maybe<Array<RecipeStepModel>>;
  slug: Scalars['String']['output'];
  tags: Array<RecipeTagModel>;
  title: Scalars['String']['output'];
  user?: Maybe<UserModel>;
  userId: Scalars['String']['output'];
};

export const RecipeSort = {
  CookingTime: 'COOKING_TIME',
  New: 'NEW',
  Popular: 'POPULAR',
  Recommended: 'RECOMMENDED'
} as const;

export type RecipeSort = typeof RecipeSort[keyof typeof RecipeSort];
export type RecipeStepModel = {
  __typename?: 'RecipeStepModel';
  content: Scalars['String']['output'];
  recipeId: Scalars['String']['output'];
  recipeStepId: Scalars['String']['output'];
  stepNumber?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type RecipeTagModel = {
  __typename?: 'RecipeTagModel';
  tagId: Scalars['String']['output'];
  tagName: Scalars['String']['output'];
};

export const RecipeUnit = {
  Cloves: 'CLOVES',
  Cup: 'CUP',
  Gram: 'GRAM',
  Kilogram: 'KILOGRAM',
  Liter: 'LITER',
  Milliliter: 'MILLILITER',
  Piece: 'PIECE',
  Pinch: 'PINCH',
  Slice: 'SLICE',
  Tablespoon: 'TABLESPOON',
  Teaspoon: 'TEASPOON'
} as const;

export type RecipeUnit = typeof RecipeUnit[keyof typeof RecipeUnit];
export type RecipesQueryInput = {
  difficulty?: InputMaybe<Difficulty>;
  dishType?: InputMaybe<DishType>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<RecipeSort>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  user: UserModel;
};

export type RemoveCartItemInput = {
  cartItemId: Scalars['String']['input'];
};

export const SaleUnit = {
  Gram: 'GRAM',
  Kilogram: 'KILOGRAM',
  Liter: 'LITER',
  Milliliter: 'MILLILITER',
  Piece: 'PIECE'
} as const;

export type SaleUnit = typeof SaleUnit[keyof typeof SaleUnit];
export type ShoppingListItemForCartModel = {
  __typename?: 'ShoppingListItemForCartModel';
  listItemId: Scalars['String']['output'];
  recipeUnit: RecipeUnit;
  requiredAmount: Scalars['Decimal']['output'];
};

export type ShoppingListItemModel = {
  __typename?: 'ShoppingListItemModel';
  listItemId: Scalars['String']['output'];
  product: ProductModel;
  recipeUnit: RecipeUnit;
  requiredAmount: Scalars['Decimal']['output'];
  sources: Array<ShoppingListItemSourceModel>;
};

export type ShoppingListItemSourceModel = {
  __typename?: 'ShoppingListItemSourceModel';
  ingredientNote?: Maybe<Scalars['String']['output']>;
  ingredientsVersionUsed: Scalars['Int']['output'];
  quantity: Scalars['Decimal']['output'];
  recipe: RecipeModel;
  recipeId: Scalars['String']['output'];
  recipeUnit: RecipeUnit;
};

export type ShoppingListModel = {
  __typename?: 'ShoppingListModel';
  createdAt: Scalars['DateTime']['output'];
  hasOutdatedRecipes: Scalars['Boolean']['output'];
  listId: Scalars['String']['output'];
  listItems: Array<ShoppingListItemModel>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ToggleLikeResponse = {
  __typename?: 'ToggleLikeResponse';
  isLiked: Scalars['Boolean']['output'];
};

export type UpdateCartItemPurchaseInput = {
  cartItemId: Scalars['String']['input'];
  goodsCount?: InputMaybe<Scalars['Decimal']['input']>;
  productVariantId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIngredientInput = {
  ingredientId: Scalars['String']['input'];
  ingredientNote?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Decimal']['input']>;
  recipeUnit?: InputMaybe<RecipeUnit>;
};

export type UpdateProductInput = {
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
  recipeUnit?: InputMaybe<RecipeUnit>;
};

export type UpdateProductVariantInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  pricingAmount?: InputMaybe<Scalars['Decimal']['input']>;
  pricingUnit?: InputMaybe<SaleUnit>;
  variantNote?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRecipeInput = {
  addIngredients?: InputMaybe<Array<CreateIngredientInput>>;
  addRecipeSteps?: InputMaybe<Array<CreateRecipeStepInput>>;
  calories?: InputMaybe<Scalars['Int']['input']>;
  cookingTime?: InputMaybe<Scalars['Int']['input']>;
  deleteIngredientIds?: InputMaybe<Array<Scalars['String']['input']>>;
  deleteStepIds?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Difficulty>;
  dishType?: InputMaybe<DishType>;
  nutritionFacts?: InputMaybe<NutritionFactsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  updateIngredients?: InputMaybe<Array<UpdateIngredientInput>>;
  updateRecipeSteps?: InputMaybe<Array<UpdateRecipeStepInput>>;
};

export type UpdateRecipeStepInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  recipeStepId: Scalars['String']['input'];
  stepNumber?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  role: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  verificationToken?: Maybe<Scalars['String']['output']>;
};

export type UserProfileModel = {
  __typename?: 'UserProfileModel';
  bio?: Maybe<Scalars['String']['output']>;
  birthYear?: Maybe<Scalars['Int']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
};

export type UserProfileUpdateInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  birthYear?: InputMaybe<Scalars['Int']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
};

export type UserUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
};

export type UserWithProfileModel = {
  __typename?: 'UserWithProfileModel';
  fitnessProfile?: Maybe<FitnessProfileModel>;
  userProfile?: Maybe<UserProfileModel>;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', user: { __typename?: 'UserModel', avatarUrl?: string | null, email: string, firstName: string, userId: string, role: string } } };

export type ResendVerificationMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendVerificationMutation = { __typename?: 'Mutation', resendVerification: boolean };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'UserModel', avatarUrl?: string | null, email: string, firstName: string, role: string, userId: string, verificationToken?: string | null } } };

export type GetAllRecipesQueryVariables = Exact<{
  input: RecipesQueryInput;
}>;


export type GetAllRecipesQuery = { __typename?: 'Query', allRecipes: Array<{ __typename?: 'RecipeModel', calories?: number | null, cookingTime?: number | null, description: string, difficulty: Difficulty, dishType: DishType, ingredientsVersion: number, likesCount: number, recipeId: string, slug: string, title: string, userId: string, user?: { __typename?: 'UserModel', avatarUrl?: string | null, firstName: string } | null }> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ResendVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ResendVerificationMutation, ResendVerificationMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"verificationToken"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const GetAllRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllRecipes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipesQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allRecipes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"cookingTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"dishType"}},{"kind":"Field","name":{"kind":"Name","value":"ingredientsVersion"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"recipeId"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllRecipesQuery, GetAllRecipesQueryVariables>;