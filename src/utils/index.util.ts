import type { Mention, Profile } from '@/types/general.type'

export function cleanObject<T>(obj: any, def: new () => T): T {
  const cleaned: Partial<T> = {}
  const props = Object.getOwnPropertyNames(new def())
  for (const key of props) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cleaned[key as keyof T] = obj[key]
    }
  }
  return cleaned as T
}

export function getProfile(obj: {
  ref: string
  nickname: string
  profileImg: string
  coverImg: string
  introduce: string
  teamId: number
}): Profile {
  return obj
}

export function getMention(obj: { ref: string; nickname: string }): Mention {
  return obj
}
