interface AvatarUploadResponse {
  message: string
  avatarUrl: string
  avatarBlobPath: string
}

class AvatarService {
  private _AVATAR = '/api/media/avatar'

  async uploadAvatar(file: File): Promise<AvatarUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${this._AVATAR}/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })

    const data: AvatarUploadResponse | { message?: string } = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed')
    }

    return data as AvatarUploadResponse
  }

  async deleteAvatar() {
    const response = await fetch(`${this._AVATAR}/delete`, {
      method: 'DELETE',
      credentials: 'include'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Avatar delete failed')
    }

    return data
  }
}

export const avatarService = new AvatarService()
