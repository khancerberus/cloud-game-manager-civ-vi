import { sequelize } from '@/lib/sequelize'
import { DataTypes } from 'sequelize'
import type { IGamePlayer } from '@/types/gamePlayer'
import { Game } from './game'
import { Player } from './player'

export const GamePlayer = sequelize.define<IGamePlayer>(
    'gamePlayer',
    {
        playerTurn: {
            type: DataTypes.SMALLINT,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'GAME_PLAYER'
    }
)

Game.belongsToMany(Player, { through: GamePlayer, as: 'players' })
Player.belongsToMany(Game, { through: GamePlayer, as: 'games'})
