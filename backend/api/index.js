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

//Gets all users
app.get("/users", (req, res) => {
  //TODO: res.send(<all users>)
  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

//Creates a new user
app.post("/users", (req, res) => {
  //TODO: read data from req

  //TODO: answer with 200 if creation was successful
  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

//Gets a specific user
app.get("/users/:userId", (req, res) => {
  // retrieve user id
  const userID = req.params.userId;

  // TODO: get User

  // TODO: return User

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

//Updates a specific user
app.put("/users/:userId", (req, res) => {
  // retrieve user id
  const userID = req.params.userId;

  // TODO: get User

  // TODO: Update User Data

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Deletes a specific user
 */
app.delete("/users/:userId", (req, res) => {
  // retrieve user id
  const userID = req.params.userId;

  // TODO: get User

  // TODO: Update User Data

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Gets all groups
 */
app.get("/groups", (req, res) => {
  // TODO: get all groups

  // TODO: return all groups

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

//create a new group
app.post("/groups", (req, res) => {
  // TODO: get all groups

  // TODO: return all groups

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

// Gets a specific group
app.get("/groups/:groupId", (req, res) => {
  // retrieve groupId
  const groupId = req.params.groupId;

  // TODO: get group by ID

  // TODO: return group

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Updates a specific group
 */
app.put("/groups/:groupId", (req, res) => {
  // retrieve groupId
  const groupId = req.params.groupId;

  // TODO: get group by ID

  // TODO: Update group

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Deletes a specific group
 */
app.delete("/groups/:groupId", (req, res) => {
  // retrieve groupId
  const groupId = req.params.groupId;

  // TODO: get group by ID

  // TODO: Delete group

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Gets all users for a specific group
 */
app.get("/groups/:groupId/users", (req, res) => {
  // retrieve groupId
  const groupId = req.params.groupId;

  // TODO: get group by ID

  // TODO: get group members

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Adds a user to a specific group
 */
app.post("/groups/:groupId/users", (req, res) => {
  // retrieve groupId
  const groupId = req.params.groupId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Gets a specific user for a specific group
 */
app.get("/groups/:groupId/users/:userId", (req, res) => {
  // retrieve groupId and userId
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Updates the User Role of a specific user for a specific group
 */
app.put("/groups/:groupId/users/:userId", (req, res) => {
  // retrieve groupId and userId
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Deletes a user from a specific group
 */
app.delete("/groups/:groupId/users/:userId", (req, res) => {
  // retrieve groupId and userId
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Gets all kanban boards for a specific group
 */
app.get("/groups/:groupId/boards", (req, res) => {
  // retrieve groupId and userId
  const groupId = req.params.groupId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Creates a new kanban board for a specific group
 */
app.post("/groups/:groupId/boards", (req, res) => {
  // retrieve groupId and userId
  const groupId = req.params.groupId;
  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Gets a specific board for a specific group
 */
app.get("/groups/:groupId/boards/:boardId", (req, res) => {
  // retrieve groupId and boardId
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Updates a specific board for a specific group
 */
app.put("/groups/:groupId/boards/:boardId", (req, res) => {
  // retrieve groupId and boardId
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Deletes an existing board for a specific group
 */
app.delete("/groups/:groupId/boards/:boardId", (req, res) => {
  // retrieve groupId and boardId
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;

  // TODO: decide what to do based on what information is provided

  // TODO: Needed: Background-Task that checks if all cards, if cards exist, are in the column Done

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Gets all cards for a specific board
 */
app.get("/groups/:groupId/boards/:boardId/cards", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Creates a new card for a specific board
 * 
 * In the column Backlog only
 * 
 */
app.post("/groups/:groupId/boards/:boardId/cards", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;
  
  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Gets a specific card for a specific board
 */
app.get("/groups/:groupId/boards/:boardId/cards/:cardId", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;
  const cardId = req.params.cardId;

  // TODO: decide what to do based on what information is provided

  

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Updates a specific card for a specific board
 * 
 * E.g. move to another column
 * 
 * Function needed to check if the move is valid (assuming One-way system)
 */
app.put("/groups/:groupId/boards/:boardId/cards/:cardId", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;
  const cardId = req.params.cardId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Deletes an existing card for a specific board
 * 
 * In the column Backlog only
 */
app.delete("/groups/:groupId/boards/:boardId/cards/:cardId", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;
  const cardId = req.params.cardId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Gets all labels for a specific board
 */
app.get("/groups/:groupId/boards/:boardId/labels", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;

   // TODO: decide what to do based on what information is provided

   res.status(501); //501 = Not Implemented
   res.send("This feature is comming soon");
});

/**
 * Creates a new label for a specific board
 */
app.post("/groups/:groupId/boards/:boardId/labels", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;

   // TODO: decide what to do based on what information is provided

   res.status(501); //501 = Not Implemented
   res.send("This feature is comming soon");
});

/**
 * Gets a specific label for a specific board
 */
app.get("/groups/:groupId/boards/:boardId/labels/:labelId", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;
  const labelId = req.params.labelId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Updates a specific label for a specific board
 */
app.put("/groups/:groupId/boards/:boardId/labels/:labelId", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;
  const labelId = req.params.labelId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});

/**
 * Deletes a specific label for a specific board
 */
app.delete("/groups/:groupId/boards/:boardId/labels/:labelId", (req, res) => {
  const groupId = req.params.groupId;
  const boardId = req.params.boardId;
  const labelId = req.params.labelId;

  // TODO: decide what to do based on what information is provided

  res.status(501); //501 = Not Implemented
  res.send("This feature is comming soon");
});