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

        res.status(201).json(results.rows[0]);  // Gibt das neu erstellte Board zurück
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

module.exports = {
    getGroups,
    postGroup,
    getBoardsByGroup,
    postBoardByGroup,
    getSpecificBoardOfGroup,
    putSpecificBoardOfGroup,
    deleteSpecificBoardOfGroup,
};