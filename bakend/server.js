const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  const TodoSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean, default: false }
});
const Todo = mongoose.model("Todo", TodoSchema);

// ✅ Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({ task: req.body.task });
  await todo.save();
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const { task, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { task, completed },
    { new: true }
  );
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// ✅ Start server
app.listen(5000, () => console.log("Server running on port 5000"));