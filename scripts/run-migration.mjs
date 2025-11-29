#!/usr/bin/env node
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function runMigration() {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })

    console.log('Running migrations...')
    await payload.db.migrate()

    console.log('Migrations completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
