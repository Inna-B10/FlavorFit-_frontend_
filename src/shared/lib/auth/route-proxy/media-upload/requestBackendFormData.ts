export async function requestBackendFormData({
  url,
  cookie,
  formData,
  authorization,
  userAgent,
  xff
}: {
  url: string
  cookie: string
  formData: FormData
  authorization?: string
  userAgent?: string
  xff?: string
}) {
  return fetch(url, {
    method: 'POST',
    headers: {
      cookie,
      ...(authorization ? { authorization } : {}),
      ...(userAgent ? { 'user-agent': userAgent } : {}),
      ...(xff ? { 'x-forwarded-for': xff } : {})
    },
    body: formData,
    cache: 'no-store'
  })
}
