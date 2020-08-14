const express = require('express');

const ProjectRouter = require('./projects/projectRouter.js');
const TaskRouter = require('./tasks/taskRouter.js');
const ResourceRouter = require('./resources/resourceRouter.js');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/tasks', TaskRouter);
server.use('/api/resources', ResourceRouter);

//Test API 
server.get("/api", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;