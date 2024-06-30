const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
//  TODO: remove Hello World
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
const userRoute = require('./routes/users');
const groupsRoute = require('./routes/groups');

app.use('/api/v1/users', userRoute);
app.use('/api/v1/courses/:cid/groups', groupsRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

