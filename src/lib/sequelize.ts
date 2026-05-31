import { Sequelize } from 'sequelize'
import pg from 'pg'

const DATABASE_URL = import.meta.env.DATABASE_URL ?? ''
const DATABASE_AUTO_CREATE = import.meta.env.DATABASE_AUTO_CREATE === 'true'

function getDatabaseName(databaseUrl: string) {
    return new URL(databaseUrl).pathname.replace(/^\//, '')
}

async function createDatabaseIfNeeded(databaseUrl: string) {
    if (!DATABASE_AUTO_CREATE || !databaseUrl) {
        return
    }

    const connectionUrl = new URL(databaseUrl)
    const databaseName = getDatabaseName(databaseUrl)
    if (!databaseName) {
        return
    }

    connectionUrl.pathname = '/postgres'

    const client = new pg.Client({
        connectionString: connectionUrl.toString()
    })

    await client.connect()

    try {
        const escapedDatabaseName = databaseName.replaceAll('"', '""')
        await client.query(`CREATE DATABASE "${escapedDatabaseName}"`)
    } catch (error: any) {
        if (error.code !== '42P04') {
            throw error
        }
    } finally {
        await client.end()
    }
}

export const sequelize = new Sequelize(DATABASE_URL, {
    dialectModule: pg,
    logging: false
})

try {
    await createDatabaseIfNeeded(DATABASE_URL)
    await sequelize.authenticate()

    if (DATABASE_AUTO_CREATE) {
        await sequelize.sync()
    }

    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}
