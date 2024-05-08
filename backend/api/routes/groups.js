const express = require(`express`);
const router = express.Router();

router
  .route(`/`)
  .get((req, res) => {
    //TODO: Implement

    //res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .post((req, res) => {
    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

router
  .route(`/:id`)
  .get((req, res) => {
    const groupId = req.params.id;

    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .put((req, res) => {
    const groupId = req.params.id;

    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .delete((req, res) => {
    const groupId = req.params.id;

    //TODO: Implement

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

router
  .route(`/:groupId/users`)
  .get((req, res) => {
    const groupId = req.params.groupId;

    //TODO: Implement
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .post((req, res) => {
    const groupId = req.params.groupId;

    //TODO: Implement
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

/**
 * Gets a specific user for a specific group
 */
router
  .route(`/:groupId/users:id`)
  .get((req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .delete((req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });
// ab hier
router
  .route(`/:groupId/boards`)
  .get((req, res) => {
    const groupId = req.params.groupId;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .post((req, res) => {
    const groupId = req.params.groupId;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

router
  .route(`/:groupId/boards/:id`)
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .delete((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.id;
    // TODO: decide what to do based on what information is provided
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });
// bis hier
router
  .route(`/:groupId/boards/:boardId/cards`)
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .post((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

router
  .route(`/:groupId/boards/:boardId/cards:id`)
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const cardsID = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const cardsID = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .delete((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const cardsID = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

router
  .route(`/:groupId/boards/:boardId/labels`)
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .post((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

  router.route(`/:groupId/boards/:boardId/labels:id`)
  .get((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const labelId = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .put((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const labelId = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .delete((req, res) => {
    const groupId = req.params.groupId;
    const boardId = req.params.boardId;
    const labelId = req.params.id;

    // TODO: decide what to do based on what information is provided

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })


module.exports = router