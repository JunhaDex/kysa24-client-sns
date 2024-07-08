import { ApiService } from '@/services/api.service'

export class FileService extends ApiService {
  constructor() {
    super('upload')
    this.client.defaults.headers['Content-Type'] = 'multipart/form-data'
  }

  async uploadUserProfile(nickname: string, data: FormData): Promise<{ location: string }> {
    const res = await this.auth().client.post(`/user/profile/${nickname}`, data)
    return this.unpackRes(res) as any
  }

  async uploadUserCover(nickname: string, data: FormData): Promise<{ location: string }> {
    const res = await this.auth().client.post(`/user/cover/${nickname}`, data)
    return this.unpackRes(res) as any
  }

  async uploadGroupProfile(groupName: string, data: FormData): Promise<{ location: string }> {
    const res = await this.auth().client.post(`/group/profile/${groupName}`, data)
    return this.unpackRes(res) as any
  }

  async uploadGroupCover(groupName: string, data: FormData): Promise<{ location: string }> {
    const res = await this.auth().client.post(`/group/cover/${groupName}`, data)
    return this.unpackRes(res) as any
  }

  async uploadPostMedia(salt: string, data: FormData): Promise<{ location: string }> {
    const res = await this.auth().client.post(`/post/${salt}`, data)
    return this.unpackRes(res) as any
  }
}
