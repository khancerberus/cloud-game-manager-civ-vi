import { usePlayerStore } from "@/stores/player"

export const PlayerCount = () => {
  const players = usePlayerStore((state) => state.players)
  return players?.length
}
