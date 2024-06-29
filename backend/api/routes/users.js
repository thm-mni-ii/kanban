const express = require(`express`);
const router = express.Router();

router
  .route(`/`)
  .get((req, res) => {
    console.log(req);
//Gets all users

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .post((req, res) => {
    console.log(req);
//Creates a new user

    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });

router
  .route(`/:id`)
  .get((req, res) => {
    console.log(req);
const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .put((req, res) => {
    console.log(req);
const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  })
  .delete((req, res) => {
    console.log(req);
const userId = req.params.id;
    //TODO: implement
    res.status(501); //501 = Not Implemented
    res.send(`This feature is comming soon`);
  });


  module.exports = router