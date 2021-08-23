const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
require("dotenv").config();

// Models
const Todo = require("./models/Todo");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();

  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Todo.findByIdAndDelete(id);

  res.json(result);
});

app.put("/todo/complete/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);

  todo.complete = !todo.complete;

  todo.save();
  res.json(todo);
});

app.listen(port, () => {
  console.log("server running on port 5000");
});
