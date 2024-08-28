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
  bb: {
    key: 'bb',
    alias: '나의 MBTI',
    icon: 'icon-movie'
  },
  ca: {
    key: 'ca',
    alias: '내 이상형',
    icon: 'icon-movie'
  },
  close: {
    key: 'close',
    alias: '나랑 친해지는 방법',
    icon: 'icon-movie'
  },
  date: {
    key: 'date',
    alias: '좋아하는 데이트',
    icon: 'icon-movie'
  },
  food: {
    key: 'food',
    alias: '평생 먹을 한가지 음식',
    icon: 'icon-movie'
  },
  fz: {
    key: 'fz',
    alias: '몇살차이까지?',
    icon: 'icon-movie'
  },
  group: {
    key: 'group',
    alias: '만들어보고싶은 모임',
    icon: 'icon-movie'
  },
  gtravel: {
    key: 'gtravel',
    alias: '기억에 남는 여행지',
    icon: 'icon-travel'
  },
  hashtag: {
    key: 'hashtag',
    alias: '나를 표현하는 해시태그',
    icon: 'icon-movie'
  },
  hobby: {
    key: 'hobby',
    alias: '여가활동 / 취미',
    icon: 'icon-movie'
  },
  learn: {
    key: 'learn',
    alias: '요즘 배워보고 싶은 것',
    icon: 'icon-movie'
  },
  million: {
    key: 'million',
    alias: '지금 100만원이 생긴다면',
    icon: 'icon-movie'
  },
  movie: {
    key: 'movie',
    alias: '좋아하는 영화',
    icon: 'icon-movie'
  },
  relation: {
    key: 'relation',
    alias: '나의 연애관',
    icon: 'icon-movie'
  },
  stress: {
    key: 'stress',
    alias: '스트레스 해소법',
    icon: 'icon-movie'
  },
  worry: {
    key: 'worry',
    alias: '현재의 고민',
    icon: 'icon-movie'
  },
  zartist: {
    key: 'zartist',
    alias: '최애 아티스트',
    icon: 'icon-movie'
  },
  zbook: {
    key: 'zbook',
    alias: '인상깊은 책',
    icon: 'icon-movie'
  },
  zdeny: {
    key: 'zdeny',
    alias: '절대 못먹는 음식',
    icon: 'icon-movie'
  },
  zmusic: {
    key: 'zmusic',
    alias: '좋아하는 음악',
    icon: 'icon-movie'
  },
  zzz: {
    key: 'zzz',
    alias: '나의 TMI',
    icon: 'icon-movie'
  }
} as const
