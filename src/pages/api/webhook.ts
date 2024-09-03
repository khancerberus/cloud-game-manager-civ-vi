import type { APIRoute } from 'astro'

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
    return new Response('Hello, world!', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
