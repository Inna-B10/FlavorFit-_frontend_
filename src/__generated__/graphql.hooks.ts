import { gql } from '@apollo/client';
import type * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;

export const GetAllRecipesDocument = gql`
    query GetAllRecipes {
  allRecipes {
    title
    recipeSteps {
      stepNumber
      content
    }
    description
  }
}
    `;

/**
 * __useGetAllRecipesQuery__
 *
 * To run a query within a React component, call `useGetAllRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRecipesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllRecipesQuery, GetAllRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllRecipesQuery, GetAllRecipesQueryVariables>(GetAllRecipesDocument, options);
      }
export function useGetAllRecipesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllRecipesQuery, GetAllRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllRecipesQuery, GetAllRecipesQueryVariables>(GetAllRecipesDocument, options);
        }
// @ts-ignore
export function useGetAllRecipesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetAllRecipesQuery, GetAllRecipesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetAllRecipesQuery, GetAllRecipesQueryVariables>;
export function useGetAllRecipesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllRecipesQuery, GetAllRecipesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetAllRecipesQuery | undefined, GetAllRecipesQueryVariables>;
export function useGetAllRecipesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllRecipesQuery, GetAllRecipesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllRecipesQuery, GetAllRecipesQueryVariables>(GetAllRecipesDocument, options);
        }
export type GetAllRecipesQueryHookResult = ReturnType<typeof useGetAllRecipesQuery>;
export type GetAllRecipesLazyQueryHookResult = ReturnType<typeof useGetAllRecipesLazyQuery>;
export type GetAllRecipesSuspenseQueryHookResult = ReturnType<typeof useGetAllRecipesSuspenseQuery>;
export type GetAllRecipesQueryResult = Apollo.QueryResult<GetAllRecipesQuery, GetAllRecipesQueryVariables>;