const pool = require('../db');
const { get } = require('./groups');
const {getUserGroups} = require("../services/groupService");

const getGroups = async (req, res) => {
  const groups = await getUserGroups(res.locals.user.id, res.locals.token)
  res.json(groups);
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

  const query = 'UPDATE board SET name = $1, description = $2 WHERE group_id = $3 AND board_id = $4 RETURNING *;';
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

  const query = 'DELETE FROM board WHERE group_id = $1 AND board_id = $2 RETURNING *;';
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

  const query = 'SELECT * FROM kantask WHERE board_id = $1';
  const values = [boardId]

  pool.query(query, values, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
};

const postCardToBoardOfGroup = (req, res) => {
  const boardId = req.params.boardId;
  const { name, description, assigned_to, due_date, created_at, status } = req.body;

  // validation of input data
  if (!name || !created_at || !status) {
    return res.status(400).json({ error: 'Titel, Erstelldatum und Status sind erforderlich' });
  }

  const query = `
        INSERT INTO kantask (board_id, name, description, assigned_to, due_date, created_at, status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *;
    `;
  const values = [boardId, name, description, assigned_to, due_date, created_at, status];

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
  const query = 'SELECT * FROM kantask WHERE board_id = $1 and kantask_id = $2';
  const values = [boardId, cardId]

  pool.query(query, values, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
};

const putSpecificCardToBoardOfGroup = (req, res) => {
  const boardId = req.params.boardId;
  const cardId = req.params.id;
  const { name, description, assigned_to, due_date, created_at, status } = req.body;

  // validation of input data
  if (!name || !created_at || !status) {
    return res.status(400).json({ error: 'Titel, Erstelldatum, und Status sind erforderlich' });
  }

  const query = `
        UPDATE kantask SET name = $1, description = $2, assigned_to = $3, due_date = $4, created_at = $5, status = $6
        WHERE board_id = $7 AND kantask_id = $8 
        RETURNING *;
        `;
  const values = [name, description, assigned_to, due_date, created_at, status, boardId, cardId];

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

  const query = 'DELETE FROM kantask WHERE board_id = $1 AND kantask_id = $2 RETURNING *;';
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

  const query = 'SELECT * FROM label WHERE board_id = $1';
  const values = [boardId]

  pool.query(query, values, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
};

const postLabelToBoardOfGroup = (req, res) => {
  const boardId = req.params.boardId;
  const { name, color } = req.body;  // assumption: request body includes name and color of label

  // validation of input data
  if (!name || !color) {
    return res.status(400).json({ error: 'Titel und Farbe sind erforderlich' });
  }

  const query = 'INSERT INTO label (board_id, name, color) VALUES ($1, $2, $3) RETURNING *;';
  const values = [boardId, name, color];

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
  const query = 'SELECT * FROM label WHERE board_id = $1 and label_id = $2';
  const values = [boardId, labelId]

  pool.query(query, values, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
};

const putSpecificLabelToBoardOfGroup = (req, res) => {
  const boardId = req.params.boardId;
  const labelId = req.params.id;
  const { name, color } = req.body;

  // validation of input data
  if (!name || !color) {
    return res.status(400).json({ error: 'Titel und Farbe sind erforderlich' });
  }

  const query = `
        UPDATE label SET name = $1, color = $2 
        WHERE board_id = $3 AND label_id = $4 
        RETURNING *;
        `;
  const values = [name, color, boardId, labelId];

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

  const query = 'DELETE FROM label WHERE board_id = $1 AND label_id = $2 RETURNING *;';
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

const getSpecificCardTimeDetails = (req, res) => {
    const cardId = req.params.id;
    const boardId = req.params.boardId;
    const query = 'SELECT time_spent FROM kantask WHERE kantask_id = $1 AND board_id = $2;';
    const values = [cardId, boardId];  

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const updateSpecificCardTime = (req, res) => {
    const cardId = req.params.id;
    const boardId = req.params.boardId;
    const { time_spent } = req.body;
    const query = 'UPDATE kantask SET time_spent = time_spent + $1 WHERE kantask_id = $2 AND board_id = $3 RETURNING time_spent;';
    const values = [time_spent, cardId, boardId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Aktualisieren der Zeit:', error);
            return res.status(500).json({ error: 'Fehler beim Aktualisieren der Zeit' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Karte nicht gefunden' });
        }

        res.status(200).json(results.rows[0]);
    });
}

const updateStatusOfCard = (req, res) => {
    const cardId = req.params.id;
    const boardId = req.params.boardId;
    const { status } = req.body;
    const query = 'UPDATE kantask SET status = $1 WHERE kantask_id = $2 AND board_id = $3 RETURNING status;';
    const values = [status, cardId, boardId];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Fehler beim Aktualisieren des Status:', error);
            return res.status(500).json({ error: 'Fehler beim Aktualisieren des Status' });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Karte nicht gefunden' });
        }

        res.status(200).json(results.rows[0]);
    });
}

const getTasksPerGroup = (req, res) => {

  const query = "SELECT b.group_id, COUNT(k.kantask_id) AS task_count FROM board b JOIN kantask k ON b.board_id = k.board_id GROUP BY b.group_id;"

  pool.query(query, null, (err, res) => {
    if (err) {
      console.error("Fehler beim erfragen der Anzahl der Aufgaben pro Gruppe");
      return res.status(500).json({ error: 'Fehler beim erfragen der Anzahl der Aufgaben pro Gruppe' });
    }

    if (results.rows.length === 0) {
      return res.status(500).json({ error: 'Keine Daten' });
    }

    res.status(200).json(results.rows);
  });
}

const getTasksDoneByGroup = (req, res) => {
  const groupId = req.params.goupId;

  const values = [groupId];

  const query = `
    SELECT  b.group_id,  
    COUNT(*) FILTER (WHERE k.done_time < CURRENT_TIMESTAMP) AS completed_tasks, 
    COUNT(*) FILTER (WHERE k.done_time IS NULL OR k.done_time > CURRENT_TIMESTAMP) AS pending_tasks 
    FROM  board b 
    JOIN  kantask k ON b.board_id = k.board_id
    WHERE  b.group_id = $1
    GROUP BY  b.group_id;
    `

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Fehler beim Ermitteln der erledigiten Aufgaben:', error);
      return res.status(500).json({ error: 'Fehler beim Ermitteln der erledigiten Aufgaben:' });
    }

    if (results.rows.length === 0) {
      return res.status(500).json({ error: 'Keine Daten' });
    }

    res.status(200).json(results);
  });
}

const getTasksPerMember = (req, res) => {
  const groupId = req.params.groupId;
  const values = [groupId];

  const query = `
    SELECT a.user_id, COUNT(a.kantask_id) AS task_count
    FROM assignee a
    JOIN kantask k ON a.kantask_id = k.kantask_id
    JOIN board b ON k.board_id = b.board_id
    WHERE b.group_id = $1
    GROUP BY a.user_id;
    `
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Fehler beim Ermitteln der Aufgaben pro Gruppenmitglied:', error);
      return res.status(500).json({ error: 'Fehler beim Ermitteln der Aufgaben pro Gruppenmitglied:' });
    }

    if (results.rows.length === 0) {
      return res.status(500).json({ error: 'Keine Daten' });
    }

    res.status(200).json(results);
  });

}

const getTasksDoneByInPercent = (req, res) => {

  const query = `
    SELECT b.group_id,
    COUNT(*) FILTER (WHERE k.done_time < CURRENT_TIMESTAMP AND k.done_time IS NOT NULL) * 100.0 / COUNT(*) AS percent_tasks_done
    FROM board b
    JOIN kantask k ON b.board_id = k.board_id
    GROUP BY b.group_id;
    `
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Fehler beim Ermitteln der eledigten Aufgaben in Prozent je Gruppe', error);
      return res.status(500).json({ error: 'Fehler beim Ermitteln der eledigten Aufgaben in Prozent je Gruppe' });
    }

    if (results.rows.length === 0) {
      return res.status(500).json({ error: 'Keine Daten' });
    }

    res.status(200).json(results);
  });

}
const getTaskamountPerLabel = (req, res) => {
  const query = `
    SELECT l.label_id, l.name AS label_name, COUNT(ktl.kantask_id) AS task_count
    FROM label l
    JOIN kantasklabel ktl ON l.label_id = ktl.label_id
    GROUP BY l.label_id, l.name;
    `
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Fehler beim Ermitteln der eledigten Aufgaben pro Label', error);
      return res.status(500).json({ error: 'Fehler beim Ermitteln der eledigten Aufgaben pro Label' });
    }

    if (results.rows.length === 0) {
      return res.status(500).json({ error: 'Keine Daten' });
    }

    res.status(200).json(results);
  });

}

const getMembersPerGroup = (req, res) => {
  const query = `
    SELECT group_id, COUNT(*) AS member_count
    FROM assignee
    GROUP BY group_id;
    `
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Fehler beim Ermitteln der Mitglieder pro Gruppe', error);
      return res.status(500).json({ error: 'Fehler beim Ermitteln der Mitglieder pro Gruppe' });
    }

    if (results.rows.length === 0) {
      return res.status(500).json({ error: 'Keine Daten' });
    }

    res.status(200).json(results);
  });

}

const getLatestDoneTime = (req, res) => {
  const query = `
    SELECT kantask_id, name, description, due_date, done_time
    FROM kantask 
    WHERE done_time = (SELECT MAX(done_time) FROM kantask WHERE done_time IS NOT NULL);
    `
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Fehler beim Ermitteln der letzten erledigten Aufgabe', error);
      return res.status(500).json({ error: 'Fehler beim Ermitteln der letzten erledigten Aufgabe' });
    }

    if (results.rows.length === 0) {
      return res.status(500).json({ error: 'Keine Daten' });
    }

    res.status(200).json(results);
  });

}

const getTasksDoneByDate = (req, res) => {
  const query = `
    SELECT group_id, DATE(done_time) AS day, COUNT(*) AS completed_tasks
    FROM kantask
    WHERE done_time IS NOT NULL
    GROUP BY group_id, DATE(done_time)
    ORDER BY group_id,
    day;
    `
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Fehler beim Ermitteln der Erlidigten Aufgaben pro Tag', error);
      return res.status(500).json({ error: 'Fehler beim Ermitteln der Erlidigten Aufgaben pro Tag' });
    }

    if (results.rows.length === 0) {
      return res.status(500).json({ error: 'Keine Daten' });
    }

    res.status(200).json(results);
  });

}

async function createTimeTracking(req, res) {
  const user_id = res.locals.user.id;
  const { group_id, activity_start, activity_duration, title, description } = req.body;

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO time_tracking (group_id, user_id, activity_start, activity_duration, title, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING time_tracking_id;';
    const values = [group_id, user_id, activity_start, activity_duration, title, description];
    const result = await client.query(query, values);
    client.release();

    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating time tracking record', params: req.body });
  }
}

async function getAllTimeEntries(req, res) {
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM time_tracking';
    const result = await client.query(query);
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching time entries' });
  }
}

async function getTimeEntryById(req, res) {
  const timeTrackingId = req.params.id;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM time_tracking WHERE time_tracking_id = $1;';
    const values = [timeTrackingId];
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Time entry not found' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching time entry' });
  }
}

const getTimeEntriesByGroup = async (req, res) => {
  const groupid = req.params.id;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM time_tracking WHERE group_id = $1;';
    const values = [groupid];
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Time entry not found' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching time entry' });
  }
}

const getTimeEntriesByGroupUser = async (req, res) => {
  const { groupid, userid } = req.params;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM time_tracking WHERE group_id = $1 AND user_id = $2;';
    const values = [groupid, userid];
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Time entry not found' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching time entry' });
  }
}

const getTimeEntriesByUser = async (req, res) => {
  const userid = req.params.id;
  const true_user = res.locals.user.id;

  if (userid == true_user) {
    try {
      const client = await pool.connect();
      const query = 'SELECT * FROM time_tracking WHERE user_id = $1;';
      const values = [userid];
      const result = await client.query(query, values);
      client.release();
      
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Time entry not found' });
      } else {
        res.json(result.rows);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching time entry' });
    }
  } else {
    console.error(`User ${true_user} tried to fetch time entries of user ${userid}`);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

const updateTimeEntry = async (req, res) => {
  const time_tracking_id = req.params.id;
  const { activity_start, activity_duration, title, description } = req.body;

  try {
    const client = await pool.connect();

    // Update the time entry
    const updateQuery = 'UPDATE time_tracking SET activity_start = $1, activity_duration = $2, title = $3, description = $4 WHERE time_tracking_id = $5 RETURNING *;';
    const updateValues = [activity_start, activity_duration, title, description, time_tracking_id];
    const updateResult = await client.query(updateQuery, updateValues);

    if (updateResult.rowCount === 0) {
      res.status(404).json({ error: 'Time entry not found' });
    } else {
      res.json(updateResult.rows);
    }

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating time entry' });
  }
}

const deleteTimeEntry = async (req, res) => {
  const time_tracking_id = req.params.id;

  try {
    const client = await pool.connect();
    const deleteQuery = 'DELETE FROM time_tracking WHERE time_tracking_id = $1 RETURNING *;';
    const deleteValues = [time_tracking_id];

    // Delete the time entry
    const deleteResult = await client.query(deleteQuery, deleteValues);

    if (deleteResult.rowCount === 0) {
      res.status(404).json({ error: 'Time entry not found' });
    } else {
      res.json(deleteResult.rows);
    }

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting time entry', values: deleteValues });
  }

}

async function getAllTaskEntries(req, res) {
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM task_tracking';
    const result = await client.query(query);
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching task entries' });
  }
}

async function getTaskEntriesByGroup(req, res) {
  const groupId = req.params.groupid;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM task_tracking JOIN time_tracking USING(time_tracking_id) WHERE group_id = $1;';
    const result = await client.query(query, [groupId]);
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching task entries' });
  }
}

async function getTaskEntriesByUser(req, res) {
  const userId = req.params.userid;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM task_tracking JOIN time_tracking USING(time_tracking_id) WHERE user_id = $1;';
    const result = await client.query(query, [userId]);
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching task entries' });
  }
}

async function getTaskEntriesByGroupUser(req, res) {
  const { groupid, userid } = req.params;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM task_tracking JOIN time_tracking USING(time_tracking_id) WHERE group_id = $1 AND user_id = $2;';
    const result = await client.query(query, [groupid, userid]);
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching task entries' });
  }
}

async function getTaskEntriesByTime(req, res) {
  const time_tracking_id = req.params.timeid;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM task_tracking JOIN time_tracking USING(time_tracking_id) WHERE time_tracking_id = $1;';
    const result = await client.query(query, [time_tracking_id]);
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching task entries' });
  }
}

async function createTaskEntry(req, res) {
  const { time_tracking_id, kantask_id } = req.body;

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO task_tracking (time_tracking_id, kantask_id) VALUES ($1, $2) RETURNING *;';
    const values = [time_tracking_id, kantask_id];
    const result = await client.query(query, values);
    client.release();

    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating time tracking record', params: req.body });
  }
}

async function deleteTaskTrackingEntry(req, res) {
  const { time_tracking_id, kantask_id } = req.body;

  try {
    const client = await pool.connect();
    const deleteQuery = 'DELETE FROM task_tracking WHERE time_tracking_id = $1 AND kantask_id = $2 RETURNING *;';
    const deleteValues = [time_tracking_id, kantask_id];

    // Delete the task_tracking entry
    const deleteResult = await client.query(deleteQuery, deleteValues);

    if (deleteResult.rowCount === 0) {
      res.status(404).json({ error: 'Time entry not found' });
    } else {
      res.json(deleteResult.rows);
    }

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting time entry', values: deleteValues });
  }
}




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
  getTasksPerGroup,
  getTasksDoneByGroup,
  getTasksPerMember,
  getTasksDoneByInPercent,
  getTaskamountPerLabel,
  getMembersPerGroup,
  getLatestDoneTime,
  getTasksDoneByDate,
  createTimeTracking,
  getAllTimeEntries,
  getTimeEntryById,
  getTimeEntriesByGroup,
  getTimeEntriesByGroupUser,
  getTimeEntriesByUser,
  updateTimeEntry,
  deleteTimeEntry,
  getAllTaskEntries,
  getTaskEntriesByGroup,
  getTaskEntriesByUser,
  getTaskEntriesByGroupUser,
  getTaskEntriesByTime,
  createTaskEntry,
  deleteTaskTrackingEntry,
  getSpecificCardTimeDetails,
  updateSpecificCardTime,
  updateStatusOfCard,
};
