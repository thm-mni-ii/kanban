const pool = require('../db');

const getGroups = (req, res) => {
    pool.query("SELECT * FROM groups", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const postGroup = (req, res) => {
    // TODO: Implement logic to insert new group into database
};

const getBoardsByGroup = (req, res) => {
    const groupId = req.params.groupId;
    const query = 'SELECT * FROM board WHERE group_id = $1;';
    const values = [groupId];

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const postBoardByGroup = (req, res) => {
    const groupId = req.params.groupId;
    const name = req.body.name;  // request body includes name of board 

    // validation of input data
    if (!name) {
        return res.status(400).json({ error: 'Name des Boards ist erforderlich' });
    }

    const query = 'INSERT INTO board (group_id, name) VALUES ($1, $2) RETURNING *;';
    const values = [groupId, name];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Einfügen des Boards:', error);
            return res.status(500).json({ error: 'Fehler beim Einfügen des Boards' });
        }

        res.status(201).json(results.rows[0]);  // return new board
    });
};

const getSpecificBoardOfGroup = (req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;
    const query = 'SELECT * FROM board WHERE group_id = $1 AND board_id = $2;';
    const values = [groupId, boardId];

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const putSpecificBoardOfGroup = (req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;
    const name = req.body.name;

    // validation of input data
    if (!name) {
        return res.status(400).json({ error: 'Name ist erforderlich' });
    }

    const query = 'UPDATE board SET title = $1, description = $2 WHERE group_id = $3 AND id = $4 RETURNING *;';
    const values = [name, groupId, boardId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Aktualisieren des Boards:', error);
            return res.status(500).json({ error: 'Fehler beim Aktualisieren des Boards' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Board nicht gefunden' });
        }

        res.status(200).json(results.rows[0]);
    });
};

const deleteSpecificBoardOfGroup = (req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;

    const query = 'DELETE FROM boards WHERE group_id = $1 AND id = $2 RETURNING *;';
    const values = [groupId, boardId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Löschen des Boards:', error);
            return res.status(500).json({ error: 'Fehler beim Löschen des Boards' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Board nicht gefunden' });
        }

        res.status(200).json({ message: 'Board erfolgreich gelöscht' });
    });
};

const getCardsOfBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;

    const query = 'SELECT * FROM cards WHERE board_id = $1';
    const values = [boardId]

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const postCardToBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;
    const { title, description, assigned_to, due_date, created_at, status } = req.body;

    // validation of input data
    if (!title || !created_at || !status) {
        return res.status(400).json({ error: 'Titel, Erstelldatum und Status sind erforderlich' });
    }

    const query = `
        INSERT INTO cards (board_id, title, description, assigned_to, due_date, created_at, status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *;
    `;
    const values = [boardId, title, description, assigned_to, due_date, created_at, status];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Einfügen der Karte:', error);
            return res.status(500).json({ error: 'Fehler beim Einfügen der Karte' });
        }

        res.status(201).json(results.rows[0]);  // return new card
    });
};

const getSpecificCardOfBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;
    const cardId = req.params.id;
    const query = 'SELECT * FROM cards WHERE board_id = $1 and id = $2';
    const values = [boardId, cardId]

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const putSpecificCardToBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;
    const cardId = req.params.id;
    const { title, description, assigned_to, due_date, created_at, status } = req.body;

    // validation of input data
    if (!title || !created_at || !status) {
        return res.status(400).json({ error: 'Titel, Erstelldatum, und Status sind erforderlich' });
    }

    const query = `
        UPDATE cards SET title = $1, description = $2, assigned_to = $3, due_date = $4, created_at = $5, status = $6
        WHERE board_id = $7 AND id = $8 
        RETURNING *;
        `;
    const values = [title, description, assigned_to, due_date, created_at, status, boardId, cardId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Aktualisieren der Karte:', error);
            return res.status(500).json({ error: 'Fehler beim Aktualisieren der Karte' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Karte nicht gefunden' });
        }

        res.status(200).json(results.rows[0]);
    });
};

const deleteSpecificCardOfBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;
    const cardId = req.params.id;

    const query = 'DELETE FROM cards WHERE board_id = $1 AND id = $2 RETURNING *;';
    const values = [boardId, cardId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Löschen der Karte:', error);
            return res.status(500).json({ error: 'Fehler beim Löschen der Karte' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Karte nicht gefunden' });
        }

        res.status(200).json({ message: 'Karte erfolgreich gelöscht' });
    });
};

const getLabelsOfBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;

    const query = 'SELECT * FROM labels WHERE board_id = $1';
    const values = [boardId]

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const postLabelToBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;
    const { title, color } = req.body;  // assumption: request body includes title and color of label

    // validation of input data
    if (!title || !color) {
        return res.status(400).json({ error: 'Titel und Farbe sind erforderlich' });
    }

    const query = 'INSERT INTO labels (board_id, title, color) VALUES ($1, $2, $3) RETURNING *;';
    const values = [boardId, title, color];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Einfügen des Labels:', error);
            return res.status(500).json({ error: 'Fehler beim Einfügen des Labels' });
        }

        res.status(201).json(results.rows[0]);  // return new label
    });
};

const getSpecificLabelOfBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;
    const labelId = req.params.id;
    const query = 'SELECT * FROM labels WHERE board_id = $1 and id = $2';
    const values = [boardId, labelId]

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const putSpecificLabelToBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;
    const labelId = req.params.id;
    const { title, color } = req.body;

    // validation of input data
    if (!title || !color) {
        return res.status(400).json({ error: 'Titel und Farbe sind erforderlich' });
    }

    const query = `
        UPDATE labels SET title = $1, color = $2 
        WHERE board_id = $3 AND id = $4 
        RETURNING *;
        `;
    const values = [title, color, boardId, labelId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Aktualisieren des Labels:', error);
            return res.status(500).json({ error: 'Fehler beim Aktualisieren des Labels' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Label nicht gefunden' });
        }

        res.status(200).json(results.rows[0]);
    });
};

const deleteSpecificLabelOfBoardOfGroup = (req, res) => {
    const boardId = req.params.boardId;
    const labelId = req.params.id;

    const query = 'DELETE FROM labels WHERE board_id = $1 AND id = $2 RETURNING *;';
    const values = [boardId, labelId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Löschen des Labels:', error);
            return res.status(500).json({ error: 'Fehler beim Löschen des Labels' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Label nicht gefunden' });
        }

        res.status(200).json({ message: 'Label erfolgreich gelöscht' });
    });
};

module.exports = {
    getGroups,
    postGroup,
    getBoardsByGroup,
    postBoardByGroup,
    getSpecificBoardOfGroup,
    putSpecificBoardOfGroup,
    deleteSpecificBoardOfGroup,
    getCardsOfBoardOfGroup,
    postCardToBoardOfGroup,
    getSpecificCardOfBoardOfGroup,
    putSpecificCardToBoardOfGroup,
    deleteSpecificCardOfBoardOfGroup,
    getLabelsOfBoardOfGroup,
    postLabelToBoardOfGroup,
    getSpecificLabelOfBoardOfGroup,
    putSpecificLabelToBoardOfGroup,
    deleteSpecificLabelOfBoardOfGroup,
};