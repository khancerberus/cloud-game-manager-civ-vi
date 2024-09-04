export const prerender = false

// import { sequelize } from '@/lib/sequelize'
import { Game } from '@/models/game'
import { GamePlayer } from '@/models/gamePlayer'
import { Player } from '@/models/player'
import type { APIRoute } from 'astro'

const DS_WEBHOOK_URL = import.meta.env.DS_WEBHOOK_URL ?? ''
const HOST = import.meta.env.HOST ?? ''

// export const GET: APIRoute = async () => {
//     await Player.sync()
//     await Game.sync()
//     await GamePlayer.sync()

//     return new Response(
//         JSON.stringify({
//             message: 'Synced!'
//         }),
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//     )
// }

/**
 * From Civilizations VI we get the following data:
 * ```json
 * {
 *     "value1": "the name of your game",
 *     "value2": "the player's Steam name",
 *     "value3": "the turn number"
 * }
 * ```
 */
export const POST: APIRoute = async ({ request }) => {
    return await request
        .json()
        .then(async (data) => {
            let { value1: gameName, value2: playerName, value3: turnNumber } = data

            const player = await Player.findOne({
                where: {
                    name: playerName
                }
            })

            playerName = player ? `<@${player.discordId}>` : playerName
            const addPlayerLink = player ? '' : `[\[Añadir\]](<${HOST}/player>)`

            await fetch(DS_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `# Turno #${turnNumber}\n\n` +
                             `Jugador: **${playerName}** ${addPlayerLink}\n` +
                             `Juego: **${gameName}**\n\n` +
                             `> [Más Información](<${HOST}>)`
                })
            })

            return new Response(
                JSON.stringify({
                    message: 'Webhook sent to discord!'
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        })
        .catch((error) => {
            console.log(error)

            if (error.name === 'SyntaxError') {
                return new Response(
                    JSON.stringify({
                        message: 'No data received!'
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        status: 400
                    }
                )
            }

            return new Response(
                JSON.stringify({
                    message: 'Internal server error!'
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    status: 500
                }
            )
        })
}
