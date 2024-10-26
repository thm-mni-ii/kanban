CREATE TABLE IF NOT EXISTS timekeeping_board (
    timekeeping_board_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name TEXT,
    year INTEGER,
    hours SMALLINT
);

CREATE TABLE IF NOT EXISTS time_entry (
    time_entry_id SERIAL PRIMARY KEY,
    timekeeping_board_id INTEGER REFERENCES timekeeping_board(timekeeping_board_id),
    name TEXT,
    description TEXT,
    start TIMESTAMP WITHOUT TIME ZONE,
    duration SMALLINT,  -- duration in HOURS
    month SMALLINT
);


