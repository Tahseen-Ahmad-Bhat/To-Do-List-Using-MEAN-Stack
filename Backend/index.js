const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("./Controllers/todoControllers");
const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors());

// Routes to handle CRUD operation requests
app.get("/get/todos", getTodos);

app.post("/create/todo", createTodo);

app.patch("/update/:todoId", updateTodo);

app.delete("/delete/:todoId", deleteTodo);

mongoose
  .connect(
    "mongodb+srv://bhattahseen8:s0JEdIVji0t4n8bz@todo-mean.cyi2m.mongodb.net/Todo-MEAN?retryWrites=true&w=majority&appName=Todo-MEAN"
  )
  .then(() => {
    console.log("Connection created successfully!");
    app.listen(PORT, () => {
      console.log(`App is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
