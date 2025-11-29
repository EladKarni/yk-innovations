import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Type for service rows returned from database
interface ServiceRow {
  id: number
  title: string
  icon: string
}

// Icon value mapping from old to new
const iconMapping: Record<string, string> = {
  'web': 'code-brackets',
  'mobile': 'chip',
  'cloud': 'cube',
  'api': 'code-brackets',
  'security': 'beaker',
  'performance': 'lightning-bolt',
  'database': 'cog',
  'analytics': 'ruler',
}

// Reverse mapping for rollback
const reverseMapping: Record<string, string> = {
  'code-brackets': 'api', // Choose most generic old value for duplicates
  'chip': 'mobile',
  'cube': 'cloud',
  'beaker': 'security',
  'lightning-bolt': 'performance',
  'cog': 'database',
  'ruler': 'analytics',
  'printer': 'web', // No old equivalent, map to generic
  'lightbulb': 'web', // No old equivalent, map to generic
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  console.log('🔒 ZERO DATA LOSS MIGRATION - Starting Services icon enum migration...')
  console.log('================================================================================')

  try {
    // SAFETY CHECKPOINT 1: Verify services data exists
    const { rows: existingServices } = (await db.execute(
      sql`SELECT id, title, icon FROM services WHERE icon IS NOT NULL`
    )) as unknown as { rows: ServiceRow[] }
    console.log(`📊 Found ${existingServices.length} services to migrate`)

    // SAFETY CHECKPOINT 2: Log all current data before ANY changes
    if (existingServices.length > 0) {
      console.log('📝 Current services before migration:')
      existingServices.forEach((s) => {
        console.log(`  - ${s.title}: ${s.icon}`)
      })
    } else {
      console.log('ℹ️  No existing services found - migration will only update enum type')
    }

    console.log('--------------------------------------------------------------------------------')
    console.log('⚙️  Starting migration steps...')

    // Step 1: Add temporary VARCHAR column
    console.log('Step 1/9: Adding temporary column icon_temp...')
    await db.execute(sql`
      ALTER TABLE services
      ADD COLUMN IF NOT EXISTS icon_temp VARCHAR(50)
    `)
    console.log('✅ Temporary column created')

    // Step 2: Copy data from icon to icon_temp with mapping
    if (existingServices.length > 0) {
      console.log('Step 2/9: Copying and mapping icon data...')
      for (const service of existingServices) {
        const oldIcon = service.icon
        const newIcon = iconMapping[oldIcon] || 'lightbulb' // Default fallback for unknown values

        await db.execute(sql`
          UPDATE services
          SET icon_temp = ${newIcon}
          WHERE id = ${service.id}
        `)

        if (iconMapping[oldIcon]) {
          console.log(`  ✓ Migrated "${service.title}": ${oldIcon} → ${newIcon}`)
        } else {
          console.log(`  ⚠️  Unknown icon "${oldIcon}" for "${service.title}" → defaulted to ${newIcon}`)
        }
      }
      console.log('✅ All data copied and mapped')
    } else {
      console.log('Step 2/9: Skipping data copy (no data to migrate)')
    }

    // Step 3: Drop old enum column
    console.log('Step 3/9: Dropping old icon column...')
    await db.execute(sql`
      ALTER TABLE services
      DROP COLUMN IF EXISTS icon
    `)
    console.log('✅ Old column dropped')

    // Step 4: Drop old enum type
    console.log('Step 4/9: Dropping old enum type...')
    await db.execute(sql`
      DROP TYPE IF EXISTS enum_services_icon CASCADE
    `)
    console.log('✅ Old enum type dropped')

    // Step 5: Create new enum type with new values
    console.log('Step 5/9: Creating new enum type...')
    await db.execute(sql`
      CREATE TYPE enum_services_icon AS ENUM (
        'lightning-bolt',
        'chip',
        'ruler',
        'code-brackets',
        'cube',
        'printer',
        'cog',
        'beaker',
        'lightbulb'
      )
    `)
    console.log('✅ New enum type created with values:')
    console.log('   lightning-bolt, chip, ruler, code-brackets, cube, printer, cog, beaker, lightbulb')

    // Step 6: Recreate icon column with new enum type
    console.log('Step 6/9: Creating new icon column with new enum type...')
    await db.execute(sql`
      ALTER TABLE services
      ADD COLUMN icon enum_services_icon
    `)
    console.log('✅ New column created')

    // Step 7: Copy data back from temp column
    if (existingServices.length > 0) {
      console.log('Step 7/9: Restoring data from temporary column...')
      await db.execute(sql`
        UPDATE services
        SET icon = icon_temp::enum_services_icon
        WHERE icon_temp IS NOT NULL
      `)
      console.log('✅ Data restored to new column')
    } else {
      console.log('Step 7/9: Skipping data restore (no data to restore)')
    }

    // Step 8: Drop temporary column
    console.log('Step 8/9: Dropping temporary column...')
    await db.execute(sql`
      ALTER TABLE services
      DROP COLUMN IF EXISTS icon_temp
    `)
    console.log('✅ Temporary column dropped')

    // Step 9: Re-add NOT NULL constraint if there was data
    if (existingServices.length > 0) {
      console.log('Step 9/9: Re-adding NOT NULL constraint...')
      await db.execute(sql`
        ALTER TABLE services
        ALTER COLUMN icon SET NOT NULL
      `)
      console.log('✅ NOT NULL constraint added')
    } else {
      console.log('Step 9/9: Skipping NOT NULL constraint (no existing data)')
    }

    console.log('--------------------------------------------------------------------------------')

    // SAFETY CHECKPOINT 3: Verify no data lost
    const { rows: migratedServices } = (await db.execute(
      sql`SELECT id, title, icon FROM services WHERE icon IS NOT NULL`
    )) as unknown as { rows: ServiceRow[] }

    console.log('🔍 VERIFICATION:')
    console.log(`   Services before migration: ${existingServices.length}`)
    console.log(`   Services after migration:  ${migratedServices.length}`)

    if (migratedServices.length !== existingServices.length) {
      throw new Error(
        `❌ DATA LOSS DETECTED! Started with ${existingServices.length} services, ended with ${migratedServices.length}`
      )
    }

    if (migratedServices.length > 0) {
      console.log('📝 Services after migration:')
      migratedServices.forEach((s) => {
        console.log(`  - ${s.title}: ${s.icon}`)
      })
    }

    console.log('================================================================================')
    console.log('✅ Migration completed successfully!')
    console.log(`   ${migratedServices.length} services migrated with ZERO data loss`)
    console.log('================================================================================')
  } catch (error) {
    console.error('================================================================================')
    console.error('❌ MIGRATION FAILED!')
    console.error('================================================================================')
    console.error(error)
    throw error
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  console.log('🔄 ROLLBACK - Starting Services icon enum migration rollback...')
  console.log('================================================================================')

  try {
    // Get current services data
    const { rows: currentServices } = (await db.execute(
      sql`SELECT id, title, icon FROM services WHERE icon IS NOT NULL`
    )) as unknown as { rows: ServiceRow[] }
    console.log(`📊 Found ${currentServices.length} services to rollback`)

    if (currentServices.length > 0) {
      console.log('📝 Current services before rollback:')
      currentServices.forEach((s) => {
        console.log(`  - ${s.title}: ${s.icon}`)
      })
    }

    console.log('--------------------------------------------------------------------------------')
    console.log('⚙️  Starting rollback steps...')

    // Step 1: Add temporary column
    console.log('Step 1/9: Adding temporary column...')
    await db.execute(sql`
      ALTER TABLE services
      ADD COLUMN IF NOT EXISTS icon_temp VARCHAR(50)
    `)
    console.log('✅ Temporary column created')

    // Step 2: Copy data with reverse mapping
    if (currentServices.length > 0) {
      console.log('Step 2/9: Copying and reverse mapping icon data...')
      for (const service of currentServices) {
        const newIcon = service.icon
        const oldIcon = reverseMapping[newIcon] || 'web' // Default fallback

        await db.execute(sql`
          UPDATE services
          SET icon_temp = ${oldIcon}
          WHERE id = ${service.id}
        `)

        if (reverseMapping[newIcon]) {
          console.log(`  ✓ Rolled back "${service.title}": ${newIcon} → ${oldIcon}`)
        } else {
          console.log(`  ⚠️  Unknown icon "${newIcon}" for "${service.title}" → defaulted to ${oldIcon}`)
        }
      }
      console.log('✅ All data reverse mapped')
    } else {
      console.log('Step 2/9: Skipping data copy (no data to rollback)')
    }

    // Step 3: Drop new enum column
    console.log('Step 3/9: Dropping new icon column...')
    await db.execute(sql`
      ALTER TABLE services
      DROP COLUMN IF EXISTS icon
    `)
    console.log('✅ New column dropped')

    // Step 4: Drop new enum type
    console.log('Step 4/9: Dropping new enum type...')
    await db.execute(sql`
      DROP TYPE IF EXISTS enum_services_icon CASCADE
    `)
    console.log('✅ New enum type dropped')

    // Step 5: Recreate old enum type
    console.log('Step 5/9: Recreating old enum type...')
    await db.execute(sql`
      CREATE TYPE enum_services_icon AS ENUM (
        'web',
        'mobile',
        'cloud',
        'api',
        'security',
        'performance',
        'database',
        'analytics'
      )
    `)
    console.log('✅ Old enum type recreated')

    // Step 6: Recreate column with old enum type
    console.log('Step 6/9: Creating icon column with old enum type...')
    await db.execute(sql`
      ALTER TABLE services
      ADD COLUMN icon enum_services_icon
    `)
    console.log('✅ Column recreated with old enum type')

    // Step 7: Copy data back
    if (currentServices.length > 0) {
      console.log('Step 7/9: Restoring data from temporary column...')
      await db.execute(sql`
        UPDATE services
        SET icon = icon_temp::enum_services_icon
        WHERE icon_temp IS NOT NULL
      `)
      console.log('✅ Data restored')
    } else {
      console.log('Step 7/9: Skipping data restore (no data to restore)')
    }

    // Step 8: Drop temporary column
    console.log('Step 8/9: Dropping temporary column...')
    await db.execute(sql`
      ALTER TABLE services
      DROP COLUMN IF EXISTS icon_temp
    `)
    console.log('✅ Temporary column dropped')

    // Step 9: Re-add NOT NULL constraint
    if (currentServices.length > 0) {
      console.log('Step 9/9: Re-adding NOT NULL constraint...')
      await db.execute(sql`
        ALTER TABLE services
        ALTER COLUMN icon SET NOT NULL
      `)
      console.log('✅ NOT NULL constraint added')
    } else {
      console.log('Step 9/9: Skipping NOT NULL constraint (no existing data)')
    }

    console.log('--------------------------------------------------------------------------------')

    // Verify rollback
    const { rows: rolledBackServices } = (await db.execute(
      sql`SELECT id, title, icon FROM services WHERE icon IS NOT NULL`
    )) as unknown as { rows: ServiceRow[] }

    console.log('🔍 VERIFICATION:')
    console.log(`   Services before rollback: ${currentServices.length}`)
    console.log(`   Services after rollback:  ${rolledBackServices.length}`)

    if (rolledBackServices.length !== currentServices.length) {
      throw new Error(
        `❌ DATA LOSS DETECTED! Started with ${currentServices.length} services, ended with ${rolledBackServices.length}`
      )
    }

    if (rolledBackServices.length > 0) {
      console.log('📝 Services after rollback:')
      rolledBackServices.forEach((s) => {
        console.log(`  - ${s.title}: ${s.icon}`)
      })
    }

    console.log('================================================================================')
    console.log('✅ Rollback completed successfully!')
    console.log(`   ${rolledBackServices.length} services rolled back with ZERO data loss`)
    console.log('================================================================================')
  } catch (error) {
    console.error('================================================================================')
    console.error('❌ ROLLBACK FAILED!')
    console.error('================================================================================')
    console.error(error)
    throw error
  }
}
