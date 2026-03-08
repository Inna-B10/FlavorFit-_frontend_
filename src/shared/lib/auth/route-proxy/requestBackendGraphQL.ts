export async function requestBackendGraphQL({
  body,
  cookie,
  authorization,
  userAgent,
  xff,
  captchaToken
}: {
  body: string
  cookie: string
  authorization: string
  userAgent: string
  xff: string
  captchaToken: string
}) {
  return fetch(process.env.BACKEND_GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'cf-turnstile-token': captchaToken,
      cookie,
      ...(authorization ? { authorization } : {}),
      ...(userAgent ? { 'user-agent': userAgent } : {}),
      ...(xff ? { 'x-forwarded-for': xff } : {})
    },
    body,
    cache: 'no-store'
  })
}
