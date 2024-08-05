export interface ExtraItem {
  key: string
  alias: string
  icon: string
}

export type UserExtraListUI = { [key: string]: ExtraItem }
export const USER_EXTRA_LIST = {
  movie: {
    key: 'movie',
    alias: '좋이하는 영화',
    icon: 'icon-movie'
  }
} as const
