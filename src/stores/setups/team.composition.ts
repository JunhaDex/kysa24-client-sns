import type { Team } from '@/types/general.type'
import { useUserStore } from '@/stores/user.store'

export const setupTeamInfo = () => {
  const userStore = useUserStore()

  function getTeamNameById(id: number): string {
    const find = userStore.teams.find((team) => team.id === id) as Team
    return find ? find.teamName : ''
  }

  return { getTeamNameById }
}
