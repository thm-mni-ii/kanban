-- Add position field to kantask table for ordering cards within a status
ALTER TABLE kantask ADD COLUMN position INTEGER DEFAULT 0;

-- Update existing cards to have sequential positions within their status
WITH ranked AS (
    SELECT kantask_id, ROW_NUMBER() OVER (PARTITION BY board_id, status ORDER BY kantask_id) - 1 as pos
    FROM kantask
)
UPDATE kantask
SET position = ranked.pos
FROM ranked
WHERE kantask.kantask_id = ranked.kantask_id;
