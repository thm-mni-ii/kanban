CREATE TABLE label (
    label_id SERIAL PRIMARY KEY,
    course_id INTEGER,
    name TEXT,
    color TEXT
);

CREATE TABLE board (
    board_id SERIAL PRIMARY KEY,
    group_id INTEGER,
    name TEXT
);
CREATE TABLE kantask (
    kantask_id SERIAL PRIMARY KEY,
    board_id INTEGER REFERENCES board(board_id),
    name TEXT,
    description TEXT,
    deadline TIMESTAMP WITHOUT TIME ZONE,
    status TEXT
);

CREATE TABLE assignee (
    assignee_id SERIAL PRIMARY KEY,
    user_id   int not null,
    course_id int not null,
    group_id  int not null,
    kantask_id INTEGER REFERENCES kantask(kantask_id),
    takeover_date TIMESTAMP WITHOUT TIME ZONE,
    UNIQUE (user_id, course_id, group_id)
);

CREATE TABLE kantasklabel (
    kantasklabel_id SERIAL PRIMARY KEY,
    label_id INTEGER REFERENCES label(label_id),
    kantask_id INTEGER REFERENCES kantask(kantask_id),
    UNIQUE (label_id, kantask_id)
);