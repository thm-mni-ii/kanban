CREATE TABLE label (
    label_ID SERIAL PRIMARY KEY,
    Kurs_ID INTEGER,
    Name TEXT,
    Farbe TEXT
);

CREATE TABLE board (
    board_ID SERIAL PRIMARY KEY,
    Gruppe_ID INTEGER,
    name TEXT
);
CREATE TABLE task (
    task_ID SERIAL PRIMARY KEY,
    board_ID INTEGER REFERENCES board(board_ID),
    name TEXT,
    description TEXT,
    deadline TIMESTAMP WITHOUT TIME ZONE,
    status TEXT
);

CREATE TABLE assignee (
    assignee_ID SERIAL PRIMARY KEY,
    task_ID INTEGER REFERENCES task(task_ID),
    Gruppenmitglied_ID INTEGER,
    übernahmezeitpunkt TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE tasklabel (
    tasklabel_ID SERIAL PRIMARY KEY,
    label_ID INTEGER REFERENCES label(label_ID),
    task_ID INTEGER REFERENCES task(task_ID)
);