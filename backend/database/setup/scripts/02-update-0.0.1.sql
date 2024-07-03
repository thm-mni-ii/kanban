ALTER TABLE kantask
RENAME COLUMN deadline TO due_date;

ALTER TABLE kantask
ADD COLUMN assigned_to TEXT;

ALTER TABLE kantask
ADD COLUMN created_at TIMESTAMP WITHOUT TIME ZONE;