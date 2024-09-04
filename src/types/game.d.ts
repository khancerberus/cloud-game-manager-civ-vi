import type { ForeignKey, Model, NonAttribute } from 'sequelize'
import type { IPlayer } from './player'

export interface IGame extends Model {
    id: string
    name: string
    turnNumber: number
    lastTurnDate: Date
    totalSeconds: number
    finished: boolean

    players?: NonAttribute<IPlayer[]>
    currentPlayerId: ForeignKey<IPlayer>
}
