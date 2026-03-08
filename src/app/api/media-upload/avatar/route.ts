import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ')

    const formData = await request.formData()

    const backendRes = await fetch(`${process.env.SERVER_URL}/media-upload/avatar`, {
      method: 'POST',
      headers: {
        cookie: cookieHeader
      },
      body: formData
    })

    const data = await backendRes.json()

    return Response.json(data, { status: backendRes.status })
  } catch {
    return Response.json({ message: 'Avatar upload failed' }, { status: 500 })
  }
}
