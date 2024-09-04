import { usePlayerStore } from '@/stores/player'
import { useEffect } from 'react'

const HOST = import.meta.env.HOST
const apiUrl = new URL(HOST)
apiUrl.pathname = '/api/player'

export const PlayerList = () => {
    const players = usePlayerStore((state) => state.players)
    const setPlayers = usePlayerStore((state) => state.setPlayers)

    useEffect(() => {
        const loadPlayers = async () => {
            const response = await fetch(apiUrl)
            const playersFetched = await response.json()
            console.log(playersFetched)
            setPlayers(playersFetched)
        }

        loadPlayers()
    }, [])

    return (
        <section className="flex flex-col min-w-[30rem] border border-slate-500 rounded-lg">
            <header className="flex flex-col bg-slate-800 p-2 rounded-t-lg">
                <h3>Jugadores registrados</h3>
            </header>

            <ul className="flex flex-col gap-2 p-2">
                {!players ||
                    (players.length === 0 && (
                        <li className="flex border border-slate-500 rounded-lg px-4">
                            😔 No hay jugadores registrados
                        </li>
                    ))}
                {players.map((player) => (
                    <li className="flex border border-slate-500 rounded-lg px-4">
                        ✅ {player.name} - {player.discordId}
                    </li>
                ))}
            </ul>
        </section>
    )
}
