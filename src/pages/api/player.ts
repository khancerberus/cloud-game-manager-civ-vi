export const prerender = false

import { Player } from '@/models/player'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
    const players = await Player.findAll()

    return new Response(JSON.stringify(players), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const POST: APIRoute = async ({ request }) => {
    return await request.json().then(async ({ name, discordId }) => {
        const player = await Player.create({
            name,
            discordId
        })

        return new Response(JSON.stringify({
            message: 'Player created!',
            player
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }).catch((error) => {
        console.log(error)

        if (error.name === 'SyntaxError') {
            return new Response(JSON.stringify({
                message: 'No data received!'
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        return new Response(JSON.stringify({
            message: 'An error occurred!'
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        })
    })
}
