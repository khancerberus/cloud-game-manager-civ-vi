import { sequelize } from '@/lib/sequelize'
import type { IGame } from '@/types/game'
import { DataTypes } from 'sequelize'

export const Game = sequelize.define<IGame>('GAME', {
    gameName: {
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
})
