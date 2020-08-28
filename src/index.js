const express = require("express");

require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201);
      res.send(user);
    })
    .catch((e) => {
      res.status(400);
      res.send(e.message);
    });
});

app.post("/tasks", ({ body }, res) => {
  const task = new Task(body);
  task
    .save()
    .then(() => {
      res.status(201);
      res.send(task);
    })
    .catch((e) => {
      res.status(400);
      res.send(e.message);
    });
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
