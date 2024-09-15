import { Player, Game } from '@/models'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
    try {
        const games = await Game.findAll({
            include: [
                {
                    model: Player,
                    as: 'players'
                },
                {
                    model: Player,
                    as: 'currentPlayer',
                },
            ]
        })

        return new Response(JSON.stringify(games), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error: any) {
        console.log(error)
        return new Response(error.message, {
            status: 500
        })
    }
}
