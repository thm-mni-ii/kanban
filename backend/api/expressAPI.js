const express = require("express");
const app = express();
const port = 3000;

//  TODO: remove Hello World
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app
  .route("/users")
  .get((req, res) => {
    //Gets all users

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .post((req, res) => {
    //Creates a new user

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/users:id")
  .get((req, res) => {
    const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .put((req, res) => {
    const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .delete((req, res) => {
    const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/groups")
  .get((req, res) => {
    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .post((req, res) => {
    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/groups:id")
  .get((req, res) => {
    const groupId = req.params.id;

    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .put((req, res) => {
    const groupId = req.params.id;

    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .delete((req, res) => {
    const groupId = req.params.id;

    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/groups/:groupId/users")
  .get((req, res) => {
    const groupId = req.params.groupId;

    //TODO: Implement
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .post((req, res) => {
    const groupId = req.params.groupId;

    //TODO: Implement
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

/**
 * Gets a specific user for a specific group
 */
app
  .route("/groups/:groupId/users:id")
  .get((req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .delete((req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/groups/:groupId/boards")
  .get((req, res) => {
    const groupId = req.params.groupId;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .post((req, res) => {
    const groupId = req.params.groupId;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/groups/:groupId/boards/:id")
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .delete((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/groups/:groupId/boards/:boardId/cards")
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .post((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/groups/:groupId/boards/:boardId/cards:id")
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const cardsID = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const cardsID = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .delete((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const cardsID = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

app
  .route("/groups/:groupId/boards/:boardId/labels")
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .post((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  });

  app.route('/groups/:groupId/boards/:boardId/labels:id')
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const labelId = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const labelId = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
  .delete((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const labelId = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send("This feature is comming soon");
  })
