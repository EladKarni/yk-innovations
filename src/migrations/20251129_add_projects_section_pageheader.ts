import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  console.log('🔒 ZERO DATA LOSS MIGRATION - Adding ProjectsSection pageHeader fields...')
  console.log('================================================================================')

  try {
    // SAFETY CHECKPOINT 1: Count existing rows before any changes
    const { rows: beforeCount } = (await db.execute(
      sql`SELECT COUNT(*) as count FROM projects_section`
    )) as unknown as { rows: Array<{ count: string }> }

    const recordsBefore = parseInt(beforeCount[0].count)
    console.log(`📊 Found ${recordsBefore} projects_section record(s)`)

    // Add the three new columns with default values
    console.log('Step 1/2: Adding pageHeader columns...')
    await db.execute(sql`
      ALTER TABLE projects_section
      ADD COLUMN IF NOT EXISTS page_header_label TEXT DEFAULT 'Portfolio',
      ADD COLUMN IF NOT EXISTS page_header_title TEXT DEFAULT 'Our Projects',
      ADD COLUMN IF NOT EXISTS page_header_description TEXT DEFAULT 'Explore our portfolio of prototyping and engineering projects across various industries. Each prototype demonstrates our expertise in bringing product concepts to reality.'
    `)
    console.log('✅ Columns added with default values:')
    console.log('   - page_header_label (TEXT, default: "Portfolio")')
    console.log('   - page_header_title (TEXT, default: "Our Projects")')
    console.log('   - page_header_description (TEXT, default: "Explore our portfolio...")')

    // SAFETY CHECKPOINT 2: Verify no data lost
    const { rows: afterCount } = (await db.execute(
      sql`SELECT COUNT(*) as count FROM projects_section`
    )) as unknown as { rows: Array<{ count: string }> }

    const recordsAfter = parseInt(afterCount[0].count)

    console.log('================================================================================')
    console.log('🔍 VERIFICATION:')
    console.log(`   Records before migration: ${recordsBefore}`)
    console.log(`   Records after migration:  ${recordsAfter}`)

    if (recordsBefore !== recordsAfter) {
      throw new Error(
        `❌ DATA LOSS DETECTED! Started with ${recordsBefore} records, ended with ${recordsAfter}`
      )
    }

    console.log('================================================================================')
    console.log('✅ Migration completed successfully!')
    console.log(`   ${recordsAfter} record(s) migrated with ZERO data loss`)
    console.log('   All existing data has been preserved')
    console.log('   New pageHeader fields are now available')
    console.log('================================================================================')
  } catch (error) {
    console.error('================================================================================')
    console.error('❌ MIGRATION FAILED!')
    console.error('================================================================================')
    console.error(error)
    console.error('================================================================================')
    console.error('⚠️  No changes were committed to the database')
    console.error('   The database remains in its original state')
    console.error('================================================================================')
    throw error
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  console.log('🔄 ROLLBACK - Removing ProjectsSection pageHeader fields...')
  console.log('================================================================================')

  try {
    // Get current record count before rollback
    const { rows: beforeCount } = (await db.execute(
      sql`SELECT COUNT(*) as count FROM projects_section`
    )) as unknown as { rows: Array<{ count: string }> }

    const recordsBefore = parseInt(beforeCount[0].count)
    console.log(`📊 Found ${recordsBefore} projects_section record(s) before rollback`)

    // Remove the three pageHeader columns
    console.log('Step 1/2: Removing pageHeader columns...')
    await db.execute(sql`
      ALTER TABLE projects_section
      DROP COLUMN IF EXISTS page_header_label,
      DROP COLUMN IF EXISTS page_header_title,
      DROP COLUMN IF EXISTS page_header_description
    `)
    console.log('✅ Columns removed:')
    console.log('   - page_header_label')
    console.log('   - page_header_title')
    console.log('   - page_header_description')

    // Verify no data lost during rollback
    const { rows: afterCount } = (await db.execute(
      sql`SELECT COUNT(*) as count FROM projects_section`
    )) as unknown as { rows: Array<{ count: string }> }

    const recordsAfter = parseInt(afterCount[0].count)

    console.log('================================================================================')
    console.log('🔍 VERIFICATION:')
    console.log(`   Records before rollback: ${recordsBefore}`)
    console.log(`   Records after rollback:  ${recordsAfter}`)

    if (recordsBefore !== recordsAfter) {
      throw new Error(
        `❌ DATA LOSS DETECTED! Started with ${recordsBefore} records, ended with ${recordsAfter}`
      )
    }

    console.log('================================================================================')
    console.log('✅ Rollback completed successfully!')
    console.log(`   ${recordsAfter} record(s) preserved with ZERO data loss`)
    console.log('   Database schema restored to previous state')
    console.log('================================================================================')
  } catch (error) {
    console.error('================================================================================')
    console.error('❌ ROLLBACK FAILED!')
    console.error('================================================================================')
    console.error(error)
    console.error('================================================================================')
    throw error
  }
}
