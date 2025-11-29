-- Migration: Fix Services Icon Enum Type Mismatch
-- Date: 2025-11-28
-- This migration safely transitions the services.icon column from old enum values to new enum values

BEGIN;

-- Safety check: Show current services data
SELECT 'Current services before migration:' AS message;
SELECT id, title, icon FROM services WHERE icon IS NOT NULL;

-- Step 1: Add temporary column
ALTER TABLE services ADD COLUMN IF NOT EXISTS icon_temp VARCHAR(50);

-- Step 2: Copy data with mapping
UPDATE services SET icon_temp =
  CASE icon::text
    WHEN 'web' THEN 'code-brackets'
    WHEN 'mobile' THEN 'chip'
    WHEN 'cloud' THEN 'cube'
    WHEN 'api' THEN 'code-brackets'
    WHEN 'security' THEN 'beaker'
    WHEN 'performance' THEN 'lightning-bolt'
    WHEN 'database' THEN 'cog'
    WHEN 'analytics' THEN 'ruler'
    ELSE 'lightbulb' -- Default fallback
  END
WHERE icon IS NOT NULL;

-- Show mapping results
SELECT 'Icon mapping results:' AS message;
SELECT
  icon::text AS old_icon,
  icon_temp AS new_icon,
  COUNT(*) AS count
FROM services
WHERE icon IS NOT NULL
GROUP BY icon::text, icon_temp;

-- Step 3: Drop old icon column
ALTER TABLE services DROP COLUMN IF EXISTS icon;

-- Step 4: Drop old enum type
DROP TYPE IF EXISTS enum_services_icon CASCADE;

-- Step 5: Create new enum type
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
);

-- Step 6: Recreate icon column with new enum type
ALTER TABLE services ADD COLUMN icon enum_services_icon;

-- Step 7: Copy data back from temp column
UPDATE services
SET icon = icon_temp::enum_services_icon
WHERE icon_temp IS NOT NULL;

-- Step 8: Drop temporary column
ALTER TABLE services DROP COLUMN IF EXISTS icon_temp;

-- Step 9: Re-add NOT NULL constraint (if there's data)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM services LIMIT 1) THEN
    ALTER TABLE services ALTER COLUMN icon SET NOT NULL;
  END IF;
END $$;

-- Verification: Show final services data
SELECT 'Services after migration:' AS message;
SELECT id, title, icon FROM services WHERE icon IS NOT NULL;

-- Show count verification
SELECT
  'Migration verification:' AS message,
  COUNT(*) AS total_services,
  COUNT(icon) AS services_with_icons
FROM services;

COMMIT;

SELECT '✅ Migration completed successfully!' AS message;
