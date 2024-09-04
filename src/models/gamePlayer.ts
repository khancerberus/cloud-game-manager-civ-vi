import { sequelize } from '@/lib/sequelize'
import { Game } from './game'
import { Player } from './player'

export const GamePlayer = sequelize.define('gamePlayer', {
}, {
    timestamps: false,
    tableName: 'GAME_PLAYER'
})

Game.belongsToMany(Player, { through: GamePlayer })
Player.belongsToMany(Game, { through: GamePlayer })
