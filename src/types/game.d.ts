import type { ForeignKey, Model, NonAttribute } from 'sequelize'
import type { IPlayer } from './player'

export interface IGame extends Model {
    gameName: string
    turnNumber: number
    lastTurnDate: Date
    totalSeconds: number
    finished: boolean

    players?: NonAttribute<IPlayer[]>
}
