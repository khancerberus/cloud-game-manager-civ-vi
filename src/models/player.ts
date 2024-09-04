import { sequelize } from '@/lib/sequelize'
import type { IPlayerModel } from '@/types/player'
import { DataTypes } from 'sequelize'

export const Player = sequelize.define<IPlayerModel>('player', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discordId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'PLAYER'
})
