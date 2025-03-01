CREATE TABLE IF NOT EXISTS time_tracking (
    time_tracking_id SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    activity_start TIMESTAMP WITHOUT TIME ZONE NOT NULL, -- UTC
    activity_duration BIGINT, -- duration in SECONDS
    title TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS task_tracking (
    time_tracking_id INTEGER REFERENCES time_tracking(time_tracking_ID) ON DELETE CASCADE,
    kantask_id INTEGER REFERENCES kantask(kantask_id) ON DELETE CASCADE,
    PRIMARY KEY (kantask_id, time_tracking_id)
);

ALTER TABLE kantask ADD COLUMN time_spent INT NOT NULL DEFAULT 0;

/* This Trigger prevents users from group A doing tasks from group B */
CREATE OR REPLACE FUNCTION check_group_match()
	RETURNS TRIGGER 
	LANGUAGE plpgsql 
	AS $$
	DECLARE
		task_group_id INTEGER;
		time_group_id INTEGER;
		my_board_id INTEGER;
	BEGIN
		SELECT group_id INTO time_group_id
		FROM time_tracking
		WHERE time_tracking_id = NEW.time_tracking_id;

		SELECT board_id INTO my_board_id
		FROM kantask
		WHERE kantask_id = NEW.kantask_id;

		SELECT group_id INTO task_group_id
		FROM board
		WHERE board_id = my_board_id;

	IF (task_group_id != time_group_id) THEN
		RAISE EXCEPTION 'The group of the task differs from the group of the user.';
	END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_group_match_trigger
BEFORE INSERT ON task_tracking
FOR EACH ROW
EXECUTE PROCEDURE check_group_match();

