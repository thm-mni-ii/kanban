const express = require(`express`);
const router = express.Router();

router
  .route(`/`)
  .get((req, res) => {
    //Gets all users

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .post((req, res) => {
    //Creates a new user

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

router
  .route(`/me`)
  .get((req, res) => {
    const user = res.locals.user;
    
    if (!user) {
      res.status(401);
      res.json({ error: 'unauthorized' });
      return;
    }

    res.json({
      id: user.id,
      username: user.username
    });
  });

router
  .route(`/:id`)
  .get((req, res) => {
    const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .put((req, res) => {
    const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .delete((req, res) => {
    const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });


  module.exports = router
