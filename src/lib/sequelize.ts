import { Sequelize } from 'sequelize'
import pg from 'pg'

const DATABASE_URL = import.meta.env.DATABASE_URL ?? ''

export const sequelize = new Sequelize(DATABASE_URL, {
    dialectModule: pg,
    logging: false
})

try {
    sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync() 
    console.log('Todos los modelos se han sincronizado con éxito.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}
