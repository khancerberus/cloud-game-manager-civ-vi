import type { IPlayer } from '@/types/player'
import { create } from 'zustand'

interface PlayerState {
    players: IPlayer[]
}

interface PlayerActions {
    setPlayers: (players: IPlayer[]) => void
    addPlayer: (player: IPlayer) => void
    removePlayer: (player: IPlayer) => void
    reset: () => void
}

const initialState = {
    players: []
}

export const usePlayerStore = create<PlayerState & PlayerActions>()((set) => ({
    ...initialState,
    setPlayers: (players) => set(() => ({ players })),
    addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
    removePlayer: (player) => set((state) => ({ players: state.players.filter((p) => p.id !== player.id) })),
    reset: () => set(() => initialState)
}))