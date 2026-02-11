export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
};

export type ActivityLevel =
  | 'ACTIVE'
  | 'LIGHTLY_ACTIVE'
  | 'MODERATELY_ACTIVE'
  | 'SEDENTARY'
  | 'VERY_ACTIVE';

export type AddManyItemsToCartInputInput = {
  listId: Scalars['String']['input'];
};

export type AddOneItemToCartInput = {
  listItemId: Scalars['String']['input'];
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  authorId: Scalars['String']['output'];
  commentId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  message: Scalars['String']['output'];
  recipeId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  note?: InputMaybe<Scalars['String']['input']>;
  productIconUrl?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
  productRecipeUnit?: InputMaybe<RecipeUnit>;
  quantity: Scalars['Decimal']['input'];
  recipeUnit: RecipeUnit;
};

export type CreateOrderInput = {
  orderNote?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  productVariants?: InputMaybe<Array<CreateProductVariantInput>>;
  recipeUnit: RecipeUnit;
};

export type CreateProductVariantInput = {
  label: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Decimal']['input'];
  pricingAmount: Scalars['Decimal']['input'];
  pricingUnit: SaleUnit;
};

export type CreateRecipeInput = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  cookingTime?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  difficulty: Difficulty;
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

export type Difficulty =
  | 'EASY'
  | 'HARD'
  | 'MEDIUM';

export type FitnessProfileModel = {
  __typename?: 'FitnessProfileModel';
  activityLevel?: Maybe<ActivityLevel>;
  armCm?: Maybe<Scalars['Int']['output']>;
  chestCm?: Maybe<Scalars['Int']['output']>;
  currentWeight?: Maybe<Scalars['Int']['output']>;
  heightCm?: Maybe<Scalars['Int']['output']>;
  nutritionGoal?: Maybe<NutritionGoal>;
  targetWeight?: Maybe<Scalars['Int']['output']>;
  thighCm?: Maybe<Scalars['Int']['output']>;
  waistCm?: Maybe<Scalars['Int']['output']>;
};

export type FitnessProfileUpdateInput = {
  activityLevel?: InputMaybe<ActivityLevel>;
  armCm?: InputMaybe<Scalars['Int']['input']>;
  chestCm?: InputMaybe<Scalars['Int']['input']>;
  currentWeight?: InputMaybe<Scalars['Int']['input']>;
  heightCm?: InputMaybe<Scalars['Int']['input']>;
  nutritionGoal?: InputMaybe<NutritionGoal>;
  targetWeight?: InputMaybe<Scalars['Int']['input']>;
  thighCm?: InputMaybe<Scalars['Int']['input']>;
  waistCm?: InputMaybe<Scalars['Int']['input']>;
};

export type FullProfileUpdateInput = {
  fitnessProfile?: InputMaybe<FitnessProfileUpdateInput>;
  profile?: InputMaybe<UserProfileUpdateInput>;
  user?: InputMaybe<UserUpdateInput>;
};

export type Gender =
  | 'FEMALE'
  | 'MALE';

export type IngredientModel = {
  __typename?: 'IngredientModel';
  ingredientId: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  product: ProductModel;
  productId: Scalars['String']['output'];
  quantity: Scalars['Decimal']['output'];
  recipeUnit: RecipeUnit;
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
  deleteOrderById: Scalars['Boolean']['output'];
  deleteProduct: ProductModel;
  deleteProductVariant: ProductVariantModel;
  deleteRecipe: RecipeModel;
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  refreshRecipeInShoppingList: ShoppingListModel;
  register: AuthResponse;
  removeAllCartItems: CartModel;
  removeCartItem: CartModel;
  removeRecipeFromShoppingList: ShoppingListModel;
  toggleLike: ToggleLikeResponse;
  updateCartItemPurchase: CartModel;
  updateComment: CommentModel;
  updateFullProfile: UserWithProfileModel;
  updateProduct: ProductModel;
  updateProductVariant: ProductVariantModel;
  updateRecipe: RecipeModel;
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


export type MutationDeleteOrderByIdArgs = {
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


export type MutationLoginArgs = {
  data: AuthInput;
};


export type MutationRefreshRecipeInShoppingListArgs = {
  input: RecipeInShoppingListInput;
};


export type MutationRegisterArgs = {
  data: AuthInput;
};


export type MutationRemoveCartItemArgs = {
  input: RemoveCartItemInput;
};


export type MutationRemoveRecipeFromShoppingListArgs = {
  input: RecipeInShoppingListInput;
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

export type NutritionFactsInput = {
  carbohydrates?: InputMaybe<Scalars['Decimal']['input']>;
  fats?: InputMaybe<Scalars['Decimal']['input']>;
  fiber?: InputMaybe<Scalars['Decimal']['input']>;
  protein?: InputMaybe<Scalars['Decimal']['input']>;
};

export type NutritionFactsModel = {
  __typename?: 'NutritionFactsModel';
  carbohydrates?: Maybe<Scalars['Decimal']['output']>;
  factId: Scalars['String']['output'];
  fats?: Maybe<Scalars['Decimal']['output']>;
  fiber?: Maybe<Scalars['Decimal']['output']>;
  protein?: Maybe<Scalars['Decimal']['output']>;
  recipeId: Scalars['String']['output'];
};

export type NutritionGoal =
  | 'GAIN_MUSCLE'
  | 'LOSE_WEIGHT'
  | 'MAINTAIN';

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

export type OrderStatus =
  | 'CANCELED'
  | 'COMPLETED'
  | 'ON_WAY'
  | 'PENDING'
  | 'PROCESSING';

export type ProductModel = {
  __typename?: 'ProductModel';
  iconUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  productVariants?: Maybe<Array<ProductVariantModel>>;
  recipeUnit: RecipeUnit;
};

export type ProductVariantModel = {
  __typename?: 'ProductVariantModel';
  label: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  price: Scalars['Decimal']['output'];
  pricingAmount: Scalars['Decimal']['output'];
  pricingUnit: SaleUnit;
  productVariantId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminAllRecipes: Array<RecipeModel>;
  adminRecipeById: RecipeModel;
  allProductVariants: Array<ProductVariantModel>;
  allProducts: Array<ProductModel>;
  allRecipes: Array<RecipeModel>;
  allUsers: Array<UserModel>;
  fullProfile: UserWithProfileModel;
  getOrderById: OrderModel;
  getOrderByReference: OrderModel;
  getOrdersByUserId: Array<OrderModel>;
  newTokens: AuthResponse;
  productById: ProductModel;
  recipeBySlug: RecipeModel;
  userById: UserModel;
};


export type QueryAdminRecipeByIdArgs = {
  recipeId: Scalars['String']['input'];
};


export type QueryAllProductVariantsArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetOrderByIdArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryGetOrderByReferenceArgs = {
  orderReference: Scalars['String']['input'];
};


export type QueryProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryRecipeBySlugArgs = {
  slug: Scalars['String']['input'];
};

export type RecipeInShoppingListInput = {
  listId: Scalars['String']['input'];
  recipeId: Scalars['String']['input'];
};

export type RecipeModel = {
  __typename?: 'RecipeModel';
  author?: Maybe<UserModel>;
  authorId: Scalars['String']['output'];
  calories?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Array<CommentModel>>;
  cookingTime?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  difficulty: Difficulty;
  ingredients: Array<IngredientModel>;
  ingredientsVersion: Scalars['Int']['output'];
  likesCount: Scalars['Int']['output'];
  nutritionFacts?: Maybe<NutritionFactsModel>;
  recipeId: Scalars['String']['output'];
  recipeSteps?: Maybe<Array<RecipeStepModel>>;
  slug: Scalars['String']['output'];
  tags: Array<RecipeTagModel>;
  title: Scalars['String']['output'];
};

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

export type RecipeUnit =
  | 'CLOVES'
  | 'GRAM'
  | 'KILOGRAM'
  | 'LITER'
  | 'MILLILITER'
  | 'PIECE'
  | 'PINCH'
  | 'SLICE'
  | 'TABLESPOON'
  | 'TEASPOON';

export type RemoveCartItemInput = {
  cartItemId: Scalars['String']['input'];
};

export type SaleUnit =
  | 'GRAM'
  | 'KILOGRAM'
  | 'LITER'
  | 'MILLILITER'
  | 'PIECE';

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
  amount: Scalars['Decimal']['output'];
  ingredientsVersionUsed: Scalars['Int']['output'];
  note?: Maybe<Scalars['String']['output']>;
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
  note?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Decimal']['input']>;
  recipeUnit?: InputMaybe<RecipeUnit>;
};

export type UpdateProductInput = {
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recipeUnit?: InputMaybe<RecipeUnit>;
};

export type UpdateProductVariantInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  pricingAmount?: InputMaybe<Scalars['Decimal']['input']>;
  pricingUnit?: InputMaybe<SaleUnit>;
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
  firstName?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  userId: Scalars['String']['output'];
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
  avatarUrl?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  fitnessProfile?: Maybe<FitnessProfileModel>;
  role: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  userProfile?: Maybe<UserProfileModel>;
};

export type GetAllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecipesQuery = { __typename?: 'Query', allRecipes: Array<{ __typename?: 'RecipeModel', title: string, description: string, recipeSteps?: Array<{ __typename?: 'RecipeStepModel', stepNumber?: number | null, content: string }> | null }> };
