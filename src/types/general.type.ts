export interface PageResponse<T> {
  meta: {
    pageNo: number
    pageSize: number
    totalPage: number
    totalCount: number
  }
  list: T[]
}

export interface PageRequest {
  page: number
  size: number
}

export interface UserAuth {
  accessToken: string
  isRegister: boolean
}

export interface Mention {
  ref: string
  nickname: string
}

export interface Profile extends Mention {
  profileImg: string
  coverImg: string
  introduce: string
  teamId: number
}

export interface User extends Profile {
  id: number
  name: string
  sex: number //iso 5218
  age: number
  dob: string
  geo: string
  actStatus: number
}

export interface Group {
  id: number
  ref: string
  groupName: string
  creator: Mention
  profileImg: string
  coverImg: string
  introduce: string
  isShow: boolean
  priority: number
  posts: Post[]
  followers: number
}

export interface Post {
  id: number
  author: Profile
  image: string
  message: string
  likes: number
  comments: number
}

export interface Reply {
  id: number
  author: Profile
  message: string
}

export interface UserNoti {
  id: number
  type: {
    category: string
    sub: string
  }
  payload: any
  readAt: string | null
}

export interface ChatMessage {
  id: number
  sender: number
  message: string
  encoded: boolean
  createdAt: Date
}

export interface ChatRoom {
  id: number
  roomRef: string
  title: string
  isBlock: boolean
  lastRead: number
  latestMessage: ChatMessage
}
