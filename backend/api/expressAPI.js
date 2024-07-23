const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
const userRoute = require('./routes/users');
const groupsRoute = require('./routes/groups');
const statRoute = require('./routes/stats');

app.use('/users', userRoute);
app.use('/groups', groupsRoute);
app.use('/stats', statRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

