const express = require("express");

require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

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
