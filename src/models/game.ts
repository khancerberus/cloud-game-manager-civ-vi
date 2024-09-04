import { sequelize } from '@/lib/sequelize'
import type { IGame } from '@/types/game'
import { DataTypes } from 'sequelize'
import { Player } from './player'

export const Game = sequelize.define<IGame>('game', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    turnNumber: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    lastTurnDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalSeconds: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'GAME'
})

Game.belongsTo(Player, { foreignKey: 'currentPlayerId' })
