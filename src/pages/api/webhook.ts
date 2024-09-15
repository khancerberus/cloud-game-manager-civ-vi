// import { sequelize } from '@/lib/sequelize'
import { Game } from '@/models/game'
import { GamePlayer } from '@/models/gamePlayer'
import { Player } from '@/models/player'
import type { APIRoute } from 'astro'

const DS_WEBHOOK_URL = import.meta.env.DS_WEBHOOK_URL ?? ''
const HOST = import.meta.env.PUBLIC_HOST ?? ''

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
            let { value1: gameName, value2: playerName, value3: playerTurn } = data

            let game = await Game.findOne({
                where: {
                    name: gameName
                }
            })
            if (!game) {
                game = await Game.create({
                    name: gameName,
                    turnsPlayed: 2,
                    lastTurnDate: new Date(),
                    totalSeconds: 0,
                    finished: false
                })
            } else {
                const today = new Date()
                const diffSeconds = Math.round((today.getTime() - game.lastTurnDate.getTime()) / 1000)

                game.turnsPlayed++
                game.totalSeconds += diffSeconds
                game.lastTurnDate = today
                await game.save()
            }

            let player = await Player.findOne({
                where: {
                    name: playerName
                }
            })
            if (!player) {
                player = await Player.create({
                    name: playerName
                })
            }

            game.currentPlayerId = player.id
            await game.save()

            let gamePlayer = await GamePlayer.findOne({
                where: {
                    gameId: game.id,
                    playerId: player.id
                }
            })
            if (!gamePlayer) {
                gamePlayer = await GamePlayer.create({
                    gameId: game.id,
                    playerId: player.id,
                    playerTurn
                })
            } else {
                gamePlayer.playerTurn = playerTurn
                await gamePlayer.save()
            }

            // playerName = player ? `<@${player.discordId}>` : playerName
            // const addPlayerLink = player ? '' : `[\[Añadir\]](<${HOST}/player>)`

            // await fetch(DS_WEBHOOK_URL, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         content: `# Turno #${playerTurn}\n\n` +
            //                  `Jugador: **${playerName}** ${addPlayerLink}\n` +
            //                  `Juego: **${gameName}**\n\n` +
            //                  `> [Más Información](<${HOST}>)`
            //     })
            // })

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
