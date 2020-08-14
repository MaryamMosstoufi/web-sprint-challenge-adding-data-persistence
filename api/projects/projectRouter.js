const express = require('express');

const Projects = require('./projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.getAllProjects()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.getProjectById(id)
  .then(project => {
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get project' });
  });
});

router.post('/', (req, res) => {
  const projectData = req.body;

  Projects.addProject(projectData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.getProjectById(id)
  .then(project => {
    if (project) {
      Projects.updateProject(changes, id)
      .then(updatedProject => {
        res.json(updatedProject);
      });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update project' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.deleteProject(id)
  .then(deleted => {
    if (deleted) {
      res.json({ project: "deleted" });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;
  Projects.getProjectById(id)
    .then(project => {
      if (project) {
      Projects.getTasksByProjectId(id)
        .then(tasks => {
          if (tasks.length) {
            res.json({ "Project": project, "Tasks": tasks });
          } else {
            res.status(404).json({ message: 'Could not find tasks for given project' })
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to get tasks' });
        });
      }else {
        res.status(404).json({ message: 'Could not find project' })
      }
    })
});

router.post('/:id/tasks', (req, res) => {
  const taskData = req.body;
  const { id } = req.params; 

  Projects.getProjectById(id)
  .then(project => {
    if (project) {
      Projects.addTask(taskData, id)
      .then(task => {
        res.status(201).json(task);
      })
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task' });
  });
});

router.get('/:id/resources', (req, res) => {
  const { id } = req.params;
  Projects.getProjectById(id)
    .then(project => {
      if (project) {
      Projects.getResourcesByProjectId(id)
        .then(projectResources => {
          if (projectResources.length) {
            res.json(projectResources);
          } else {
            res.status(404).json({ message: 'Could not find resources for given project' })
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to get resources' });
        });
      }else {
        res.status(404).json({ message: 'Could not find project' })
      }
    })
});

router.post('/:id/resources', (req, res) => {
  const projectResourceData = req.body;

  Projects.assignProjectResource(projectResourceData)
  .then(projectResource => {
    res.status(201).json(projectResource);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project resource' });
  });
});


module.exports = router;