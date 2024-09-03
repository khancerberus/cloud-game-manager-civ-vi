import { sequelize } from '@/lib/sequelize'
import { Game } from './game'
import { Player } from './player'

export const GamePlayer = sequelize.define('GAME_PLAYER', {
}, {
    timestamps: false
})

Game.belongsToMany(Player, { through: GamePlayer })
Player.belongsToMany(Game, { through: GamePlayer })
