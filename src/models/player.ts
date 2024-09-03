import { sequelize } from '@/lib/sequelize'
import type { IPlayer } from '@/types/player'
import { DataTypes } from 'sequelize'

export const Player = sequelize.define<IPlayer>('PLAYER', {
    playerId: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    playerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discordId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
})
