export interface ExtraItem {
  key: string
  alias: string
  icon: string
}

export type UserExtraListUI = { [key: string]: ExtraItem }
export const USER_EXTRA_LIST: UserExtraListUI = {
  movie: {
    key: 'movie',
    alias: '좋이하는 영화',
    icon: 'icon-movie'
  },
  travel: {
    key: 'travel',
    alias: '기억에 남는 여행지',
    icon: 'icon-travel'
  }
} as const
