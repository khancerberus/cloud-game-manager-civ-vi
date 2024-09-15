import type { ForeignKey, Model, NonAttribute } from 'sequelize'
import type { IPlayer } from './player'

export interface IGamePlayer extends Model {
    playerTurn: number

    playerId: ForeignKey<IPlayer>
    gameId: ForeignKey<IGame>
}
