export interface ExtraItem {
  key: string
  alias: string
  icon: string
}

export type UserExtraListUI = { [key: string]: ExtraItem }
export const USER_EXTRA_LIST: UserExtraListUI = {
  aka: {
    key: 'aka',
    alias: 'A.K.A',
    icon: 'icon-movie'
  },
  mbti: {
    key: 'mbti',
    alias: '나의 MBTI',
    icon: 'icon-movie'
  },
  hobby: {
    key: 'hobby',
    alias: '여가활동 / 취미',
    icon: 'icon-movie'
  },
  close: {
    key: 'close',
    alias: '나랑 친해지는 방법',
    icon: 'icon-movie'
  },
  million: {
    key: 'million',
    alias: '지금 100만원이 생긴다면',
    icon: 'icon-movie'
  },
  stress: {
    key: 'stress',
    alias: '스트레스 해소법',
    icon: 'icon-movie'
  },
  date: {
    key: 'date',
    alias: '좋아하는 데이트',
    icon: 'icon-movie'
  },
  relation: {
    key: 'relation',
    alias: '나의 연애관',
    icon: 'icon-movie'
  },
  diff: {
    key: 'diff',
    alias: '몇살차이까지?',
    icon: 'icon-movie'
  },
  hashtag: {
    key: 'hashtag',
    alias: '나를 표현하는 해시태그',
    icon: 'icon-movie'
  },
  movie: {
    key: 'movie',
    alias: '좋이하는 영화',
    icon: 'icon-movie'
  },
  book: {
    key: 'book',
    alias: '인상깊은 책',
    icon: 'icon-movie'
  },
  artist: {
    key: 'artist',
    alias: '최애 아티스트',
    icon: 'icon-movie'
  },
  music: {
    key: 'music',
    alias: '좋아하는 음악',
    icon: 'icon-movie'
  },
  travel: {
    key: 'travel',
    alias: '기억에 남는 여행지',
    icon: 'icon-travel'
  },
  food: {
    key: 'food',
    alias: '평생 먹을 한가지 음식',
    icon: 'icon-movie'
  },
  deny: {
    key: 'deny',
    alias: '절대 못먹는 음식',
    icon: 'icon-movie'
  },
  group: {
    key: 'group',
    alias: '만들어보고싶은 모임',
    icon: 'icon-movie'
  },
  learn: {
    key: 'learn',
    alias: '요즘 배워보고 싶은 것',
    icon: 'icon-movie'
  },
  worry: {
    key: 'worry',
    alias: '현재의 고민',
    icon: 'icon-movie'
  }
} as const
