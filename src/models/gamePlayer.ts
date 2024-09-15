import { sequelize } from '@/lib/sequelize'
import { Game } from './game'
import { Player } from './player'
import { DataTypes } from 'sequelize'
import type { IGamePlayer } from '@/types/gamePlayer'

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

Game.belongsToMany(Player, { through: GamePlayer })
Player.belongsToMany(Game, { through: GamePlayer })
