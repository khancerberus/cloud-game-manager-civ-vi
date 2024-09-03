import type { Model, NonAttribute } from 'sequelize'
import type { IGame } from './game'

export interface IPlayer extends Model {
    playerId: string
    playerName: string
    discordId: bigint

    games?: NonAttribute<IGame[]>
}
