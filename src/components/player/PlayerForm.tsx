import { usePlayerStore } from '@/stores/player'
import type { IPlayer } from '@/types/player'
import { useState } from 'react'

export const PlayerForm = () => {
    const addPlayer = usePlayerStore((state) => state.addPlayer)

    const [player, setPlayer] = useState<IPlayer>({
        name: '',
        discordId: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <section className="flex flex-col gap-2 p-2 border border-slate-500 rounded-lg">
            <div className="flex p-2">
                <label htmlFor="name" className="w-[7rem]">
                    Player Name:
                </label>
                <input
                    id="name"
                    type="text"
                    value={player.name}
                    onChange={handleChange}
                />
            </div>

            <div className="flex p-2">
                <label htmlFor="discordId" className="w-[7rem]">
                    Discord ID:
                </label>
                <input
                    id="discordId"
                    type="text"
                    value={player.discordId}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-center mt-4">
                <button
                    className="rounded-lg bg-red-500 p-2 px-4 hover:bg-red-600 active:bg-red-900 transition-all duration-200"
                    onClick={() => {
                        addPlayer(player)
                        setPlayer({
                            name: '',
                            discordId: ''
                        })
                    }}
                >
                    Agregar
                </button>
            </div>
        </section>
    )
}
