import type {
    BelongsToMany,
    ForeignKey,
    HasManyAddAssociationMixin,
    Model,
    NonAttribute
} from 'sequelize'
import type { IPlayer } from './player'

export interface IGame extends Model {
    id: string
    name: string
    turnsPlayed: number
    lastTurnDate: Date
    totalSeconds: number
    finished: boolean

    players?: NonAttribute<IPlayer[]>
    currentPlayerId?: ForeignKey<IPlayer['id']>
}
