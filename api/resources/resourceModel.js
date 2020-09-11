const db = require("./../../data/dbConfig.js");

module.exports = {
  getAllResources,
  getResourceById,
  addResource,
  updateResource,
  deleteResource
};

function getAllResources() {
  return db("resources");
}

function getResourceById(id) {
  return db("resources").where({ id }).first();
}

function addResource(resource) {
  return (
    db("resources")
      .insert(resource)
      .returning("id") 
      .then(ids => {
        const id = ids[0];
        return getResourceById(id);
      })
  );
}

function updateResource(changes, id) {
  return db("resources")
    .where({ id })
    .update(changes,id)
    .then(() => {
      return getResourceById(id);
    });
}

function deleteResource(id) {
  return db("resources").where({ id }).del();
}


