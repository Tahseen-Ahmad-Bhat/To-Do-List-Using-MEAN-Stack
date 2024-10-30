// app.js

const app = angular.module("todoApp", []);
app.controller("TodoController", function ($scope, $http) {
  $scope.tasks = [];
  $scope.newTask = "";

  // Fetch all tasks from the backend
  $scope.getTasks = function () {
    $http
      .get("http://localhost:8000/get/todos")
      .then(function (response) {
        $scope.tasks = response.data;
      })
      .catch(function (error) {
        console.error("Error fetching tasks:", error);
      });
  };

  // Add a new task
  $scope.addTask = function () {
    if ($scope.newTask) {
      const task = { title: $scope.newTask, completed: false };

      $http
        .post("http://localhost:8000/create/todo", task)
        .then(function (response) {
          $scope.tasks.push(response.data); // Add the new task to the list
          $scope.newTask = ""; // Clear the input field
        })
        .catch(function (error) {
          console.error("Error adding task:", error);
        });
    }
  };

  // Toggle task completion
  $scope.toggleComplete = function (task) {
    const updatedTask = { ...task, completed: !task.completed };

    $http
      .patch(`http://localhost:8000/update/${task._id}`, updatedTask)
      .then(function (response) {
        task.completed = response.data.completed; // Update completion status in the view
      })
      .catch(function (error) {
        console.error("Error updating task:", error);
      });
  };

  // Delete a task
  $scope.deleteTask = function (index) {
    const task = $scope.tasks[index];
    console.log(task);

    $http
      .delete(`http://localhost:8000/delete/${task._id}`)
      .then(function (response) {
        $scope.tasks.splice(index, 1); // Remove the task from the list
      })
      .catch(function (error) {
        console.error("Error deleting task:", error);
      });
  };

  // Initialize the task list by fetching data from the backend
  $scope.getTasks();
});
