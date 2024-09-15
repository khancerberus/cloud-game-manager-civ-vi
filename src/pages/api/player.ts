import { Game, Player } from '@/models'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ url }) => {
    try {
        const playerId = url.searchParams.get('playerId')
        if (playerId) {
            const player = await Player.findByPk(playerId)
            if (!player) {
                return new Response(JSON.stringify({
                    message: 'Player not found!'
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    status: 404
                })
            }

            return new Response(JSON.stringify(player), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            const players = await Player.findAll({
                include: [
                    {
                        model: Game,
                        as: 'games'
                    }
                ]
            })

            return new Response(JSON.stringify(players), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (error) {
        console.log(error)

        return new Response(JSON.stringify({
            message: 'An error occurred!'
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 500
        })
    }
}

// export const POST: APIRoute = async ({ request }) => {
//     return await request.json().then(async ({ name, discordId }) => {
//         const player = await Player.create({
//             name,
//             discordId
//         })

//         return new Response(JSON.stringify({
//             message: 'Player created!',
//             player
//         }), {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })

//     }).catch((error) => {
//         console.log(error)

//         if (error.name === 'SyntaxError') {
//             return new Response(JSON.stringify({
//                 message: 'No data received!'
//             }), {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//         }

//         return new Response(JSON.stringify({
//             message: 'An error occurred!'
//         }), {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             status: 500
//         })
//     })
// }
