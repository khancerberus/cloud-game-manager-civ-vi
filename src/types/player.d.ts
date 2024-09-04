import type {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize'
import type { IGame } from './game'

export interface IPlayer {
    id?: string
    name: string
    discordId: string

    games?: NonAttribute<IGame[]>
}

export interface IPlayerModel
    extends Model<InferAttributes<IPlayer>, InferCreationAttributes<IPlayer>>, IPlayer {}
