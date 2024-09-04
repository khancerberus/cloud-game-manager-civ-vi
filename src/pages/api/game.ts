export const prerender = false

import { Game } from '@/models/game'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
    const games = await Game.findAll()

    return new Response(JSON.stringify(games), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
