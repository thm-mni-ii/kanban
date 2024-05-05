-- Create a new database called 'kanbanDB'

CREATE TABLE Studierende (
    Benutzerkennung TEXT PRIMARY KEY
);

CREATE TABLE Dozierende (
    Mitarbeiternummer BIGINT PRIMARY KEY
);

CREATE TABLE Kurs (
    Kurs_ID SERIAL PRIMARY KEY,
    Mitarbeiternummer BIGINT REFERENCES Dozierende(Mitarbeiternummer),
    Name TEXT
);

CREATE TABLE Kursbelegung (
    Kursbelegung_ID SERIAL PRIMARY KEY,
    Kurs_ID INTEGER REFERENCES Kurs(Kurs_ID),
    Benutzerkennung TEXT REFERENCES Studierende(Benutzerkennung)
);

CREATE TABLE Gruppe (
    Gruppe_ID SERIAL PRIMARY KEY,
    Kurs_ID INTEGER REFERENCES Kurs(Kurs_ID),
    Name TEXT,
    Mitgliederanzahl INTEGER
);

CREATE TABLE Label (
    Label_ID SERIAL PRIMARY KEY,
    Kurs_ID INTEGER REFERENCES Kurs(Kurs_ID),
    Name TEXT,
    Farbe TEXT
);

CREATE TABLE Gruppenmitglied (
    Gruppenmitglied_ID SERIAL PRIMARY KEY,
    Kursbelegung_ID INTEGER REFERENCES Kursbelegung(Kursbelegung_ID),
    Gruppe_ID INTEGER REFERENCES Gruppe(Gruppe_ID)
);

CREATE TABLE Board (
    Board_ID SERIAL PRIMARY KEY,
    Gruppe_ID INTEGER REFERENCES Gruppe(Gruppe_ID),
    Name TEXT
);

CREATE TABLE Aufgabe (
    Aufgabe_ID SERIAL PRIMARY KEY,
    Board_ID INTEGER REFERENCES Board(Board_ID),
    Name TEXT,
    Beschreibung TEXT,
    Deadline TIMESTAMP WITHOUT TIME ZONE,
    Status TEXT
);

CREATE TABLE Zuständig (
    Zuständig_ID SERIAL PRIMARY KEY,
    Aufgabe_ID INTEGER REFERENCES Aufgabe(Aufgabe_ID),
    Gruppenmitglied_ID INTEGER REFERENCES Gruppenmitglied(Gruppenmitglied_ID),
    übernahmezeitpunkt TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE Aufgabenlabel (
    Aufgabenlabel_ID SERIAL PRIMARY KEY,
    Label_ID INTEGER REFERENCES Label(Label_ID),
    Aufgabe_ID INTEGER REFERENCES Aufgabe(Aufgabe_ID)
);
