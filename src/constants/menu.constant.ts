import type { MenuItem } from '@/types/ui.type'

export const unfollowMenu: MenuItem[] = [
  {
    eventKey: 'unfollowGroup',
    label: '팔로우 취소',
    style: 'text-error',
    disabled: false
  }
] as const

export const userHandleMenu: MenuItem[] = [
  {
    eventKey:'openProfile',
    label: '프로필 보기',
  },
  {
    eventKey:'openProfile',
    label: '프로필 보기',
  }
]
