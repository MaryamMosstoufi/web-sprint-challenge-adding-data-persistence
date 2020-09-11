const db = require("./../../data/dbConfig.js");

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  getTasksByProjectId,
  addTask,
  getResourcesByProjectId,
  assignProjectResource
};

function getAllProjects() {
  return db("projects");
}

function getProjectById(id) {
  return db("projects").where({ id }).first();
}

function addProject(project) {
  return (
    db("projects")
      .insert(project)
      .returning("id") 
      .then(ids => {
        const id = ids[0];
        return getProjectById(id);
      })
  );
}

function updateProject(changes, id) {
  return db("projects")
    .where({ id })
    .update(changes,id)
    .then(() => {
      return getProjectById(id);
    });
}

function deleteProject(id) {
  return db("projects").where({ id }).del();
}

function getTasksByProjectId(id) {
  return db("tasks").where({ projectId: id });
}

function addTask(task, id) {
  return (
    db("tasks")
      .where({ id })
      .insert(task)
      .returning("id")
      .then(ids => {
        const id = ids[0];
        return id;
      })
  );
}
function getResourcesByProjectId(id) {
  return db("project_resources").where({ projectId: id });
}

function assignProjectResource(projectResource) {
  return (
    db("project_resources")
      .insert(projectResource)
      .returning("id") 
      .then(ids => {
        const id = ids[0];
        return id;
      })
  );
}
function assignProjectResource(projectResource) {
  return (
    db("project_resources")
      .insert(projectResource)
      .returning("id") 
      .then(ids => {
        const id = ids[0];
        return id;
      })
  );
}


