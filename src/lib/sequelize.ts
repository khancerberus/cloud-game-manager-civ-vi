import { Sequelize } from 'sequelize'
import pg from 'pg'

const DATABASE_URL = import.meta.env.DATABASE_URL ?? ''
const DATABASE_AUTO_CREATE = import.meta.env.DATABASE_AUTO_CREATE === 'true'
const PG_DUPLICATE_DATABASE = '42P04'
const DATABASE_NAME_PATTERN = /^[A-Za-z0-9_-]+$/

function getDatabaseName(databaseUrl: string) {
    return new URL(databaseUrl).pathname.replace(/^\//, '')
}

function hasErrorCode(error: unknown): error is { code?: string } {
    return typeof error === 'object' && error !== null && 'code' in error
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

    if (!DATABASE_NAME_PATTERN.test(databaseName)) {
        throw new Error(`DATABASE_URL contains an unsupported database name: "${databaseName}"`)
    }

    connectionUrl.pathname = '/postgres'

    const client = new pg.Client({
        connectionString: connectionUrl.toString()
    })

    try {
        await client.connect()

        const quotedDatabaseName = databaseName.replaceAll('"', '""')
        await client.query(`CREATE DATABASE "${quotedDatabaseName}"`)
    } catch (error: unknown) {
        if (!hasErrorCode(error) || error.code !== PG_DUPLICATE_DATABASE) {
            console.error(`Unable to create database "${databaseName}":`, error)
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

if (DATABASE_AUTO_CREATE) {
    try {
        await createDatabaseIfNeeded(DATABASE_URL)
    } catch (error) {
        console.error('Unable to create the database automatically:', error)
    }
}

try {
    await sequelize.authenticate()

    if (DATABASE_AUTO_CREATE) {
        console.warn('DATABASE_AUTO_CREATE is enabled; synchronizing the database schema automatically. Avoid enabling this in production.')
        await sequelize.sync()
    }

    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}
