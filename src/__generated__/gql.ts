/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      avatarUrl\n      email\n      firstName\n      role\n      userId\n      verificationToken\n    }\n  }\n}": typeof types.LoginDocument,
    "mutation Logout {\n  logout\n}": typeof types.LogoutDocument,
    "query Me {\n  me {\n    avatarUrl\n    email\n    firstName\n    role\n    userId\n    verificationToken\n  }\n}": typeof types.MeDocument,
    "mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    user {\n      avatarUrl\n      email\n      firstName\n      userId\n      role\n      verificationToken\n    }\n  }\n}": typeof types.RegisterDocument,
    "mutation ResendVerification($email: String!) {\n  resendVerification(email: $email)\n}": typeof types.ResendVerificationDocument,
    "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    user {\n      avatarUrl\n      email\n      firstName\n      role\n      userId\n      verificationToken\n    }\n  }\n}": typeof types.VerifyEmailDocument,
    "query GetAllRecipes($input: RecipesQueryInput!) {\n  allRecipes(input: $input) {\n    calories\n    cookingTime\n    description\n    difficulty\n    dishType\n    ingredientsVersion\n    likesCount\n    recipeId\n    slug\n    title\n    userId\n    user {\n      avatarUrl\n      firstName\n    }\n  }\n}": typeof types.GetAllRecipesDocument,
};
const documents: Documents = {
    "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      avatarUrl\n      email\n      firstName\n      role\n      userId\n      verificationToken\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "query Me {\n  me {\n    avatarUrl\n    email\n    firstName\n    role\n    userId\n    verificationToken\n  }\n}": types.MeDocument,
    "mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    user {\n      avatarUrl\n      email\n      firstName\n      userId\n      role\n      verificationToken\n    }\n  }\n}": types.RegisterDocument,
    "mutation ResendVerification($email: String!) {\n  resendVerification(email: $email)\n}": types.ResendVerificationDocument,
    "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    user {\n      avatarUrl\n      email\n      firstName\n      role\n      userId\n      verificationToken\n    }\n  }\n}": types.VerifyEmailDocument,
    "query GetAllRecipes($input: RecipesQueryInput!) {\n  allRecipes(input: $input) {\n    calories\n    cookingTime\n    description\n    difficulty\n    dishType\n    ingredientsVersion\n    likesCount\n    recipeId\n    slug\n    title\n    userId\n    user {\n      avatarUrl\n      firstName\n    }\n  }\n}": types.GetAllRecipesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      avatarUrl\n      email\n      firstName\n      role\n      userId\n      verificationToken\n    }\n  }\n}"): (typeof documents)["mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      avatarUrl\n      email\n      firstName\n      role\n      userId\n      verificationToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    avatarUrl\n    email\n    firstName\n    role\n    userId\n    verificationToken\n  }\n}"): (typeof documents)["query Me {\n  me {\n    avatarUrl\n    email\n    firstName\n    role\n    userId\n    verificationToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    user {\n      avatarUrl\n      email\n      firstName\n      userId\n      role\n      verificationToken\n    }\n  }\n}"): (typeof documents)["mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    user {\n      avatarUrl\n      email\n      firstName\n      userId\n      role\n      verificationToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResendVerification($email: String!) {\n  resendVerification(email: $email)\n}"): (typeof documents)["mutation ResendVerification($email: String!) {\n  resendVerification(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    user {\n      avatarUrl\n      email\n      firstName\n      role\n      userId\n      verificationToken\n    }\n  }\n}"): (typeof documents)["mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    user {\n      avatarUrl\n      email\n      firstName\n      role\n      userId\n      verificationToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllRecipes($input: RecipesQueryInput!) {\n  allRecipes(input: $input) {\n    calories\n    cookingTime\n    description\n    difficulty\n    dishType\n    ingredientsVersion\n    likesCount\n    recipeId\n    slug\n    title\n    userId\n    user {\n      avatarUrl\n      firstName\n    }\n  }\n}"): (typeof documents)["query GetAllRecipes($input: RecipesQueryInput!) {\n  allRecipes(input: $input) {\n    calories\n    cookingTime\n    description\n    difficulty\n    dishType\n    ingredientsVersion\n    likesCount\n    recipeId\n    slug\n    title\n    userId\n    user {\n      avatarUrl\n      firstName\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;