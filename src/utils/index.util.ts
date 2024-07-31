import type { Mention, Profile } from '@/types/general.type'
import dayjs from 'dayjs'

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

/**
 * Convert Time to String
 * Every createdAt, updatedAt, etc. should be converted.
 * @param time
 */
export function tts(time: Date | string): string {
  const current = dayjs()
  const local = dayjs(time).tz()
  const diff = current.diff(local, 'second')
  if (diff < 5) return `방금 전`
  else if (diff < 60) return `${diff}초 전`
  else if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  else if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  else if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`
  else return local.format('MM월DD일 HH:mm')
}

export function sfx(sex: number) {
  return sex === 1 ? '형제' : '자매'
}

export function timeOnly(time: Date | string): string {
  const local = dayjs(time).tz()
  return local.format('A hh:mm')
}

export function genRandStr(len: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
