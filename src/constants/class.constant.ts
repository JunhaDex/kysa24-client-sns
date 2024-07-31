import type {
  ChatMessage,
  ChatRoom,
  Group,
  Mention,
  Post,
  Profile,
  Reply,
  User,
  UserNoti
} from '@/types/general.type'

export class UserClass implements User {
  actStatus: number = 0
  age: number = 0
  coverImg: string = ''
  dob: string = ''
  geo: string = ''
  id: number = 0
  introduce: string = ''
  name: string = ''
  nickname: string = ''
  profileImg: string = ''
  ref: string = ''
  sex: number = 1
  teamId: number = 0
}

export class UserNotiClass implements UserNoti {
  id: number = 0
  payload: any = ''
  readAt: string | null = null
  type: { category: string; sub: string } = { category: '', sub: '' }
}

export class GroupClass implements Group {
  id: number = 0
  ref: string = ''
  groupName: string = ''
  creator: Mention = {} as any
  profileImg: string = ''
  coverImg: string = ''
  introduce: string = ''
  isShow: boolean = false
  priority: number = 0
  posts: Post[] = []
  followers: number = 0
  already?: boolean = undefined
}

export class PostClass implements Post {
  id: number = 0
  author: Profile = {} as any
  comments: number = 0
  image: string = ''
  likes: number = 0
  message: string = ''
  createdAt: string = ''
  iLikes?: boolean = undefined
}

export class ReplyClass implements Reply {
  id: number = 0
  author: Profile = {} as any
  message: string = ''
  createdAt: string = ''
  deletedAt: string | null = null
}

export class ChatMessageClass implements ChatMessage {
  id: number = 0
  sender: number = 0
  message: string = ''
  encoded: boolean = false
  createdAt: string = ''
}

export class ChatRoomClass implements ChatRoom {
  id: number = 0
  ref: string = ''
  title: string = ''
  isBlock: boolean = false
  lastRead: number = 0
  lastChat: ChatMessage = {} as any
}
