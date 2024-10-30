const Todo = require("../models/todoModel.js");

exports.createTodo = async (req, res) => {
  const { title, completed } = req.body;

  const newTodo = new Todo({
    title,
    completed,
  });

  const savedTodo = await newTodo.save();

  res.json(savedTodo);
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
};

exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      completed: req.body.completed,
    },
    { new: true }
  );

  res.json(updatedTodo);
};

exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  await Todo.findByIdAndDelete(todoId);

  res.json({ message: "Todo Item deleted successfully!" });
};
