const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') app.use(cors())
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
const userRoute = require('./routes/users');
const groupsRoute = require('./routes/groups');
const statRoute = require('./routes/stats');
const timeRoute = require('./routes/time');
const {JwtValidator} = require("./services/jwt.service");

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET must be set!")

const validator = new JwtValidator(process.env.JWT_SECRET);
app.use(async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    res.status(401)
    res.end();
    return;
  }
  const [_, token] = authHeader.split(" ", 2);
  const user = await validator.validate(token);
  if (!user) {
    res.status(401)
    res.end();
    return;
  }
  res.locals["token"] = token
  res.locals["user"] = user;
  next();
});


app.use('/users', userRoute);
app.use('/groups', groupsRoute);
app.use('/stats', statRoute);
app.use('/time', timeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

