const db = require("./../../data/dbConfig.js");

module.exports = {
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getResourcesByTaskId,
};

function getAllTasks() {
  return db("tasks");
}

function getTaskById(id) {
  return db("tasks").where({ id }).first();
}
function updateTask(changes, id) {
  return db("tasks")
    .where({ id })
    .update(changes,id)
    .then(() => {
      return getTaskById(id);
    });
}

function deleteTask(id) {
  return db("tasks").where({ id }).del();
}

function getResourcesByTaskId(id) {
  return db("resources").where({ taskId: id });
}
