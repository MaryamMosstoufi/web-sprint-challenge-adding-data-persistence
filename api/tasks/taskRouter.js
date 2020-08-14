const express = require('express');

const Tasks = require('./taskModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Tasks.getAllTasks()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.getTaskById(id)
  .then(task => {
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Could not find task with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get task' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Tasks.getTaskById(id)
  .then(task => {
    if (task) {
      Tasks.updateTask(changes, id)
      .then(updatedTask => {
        res.json(updatedTask);
      });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update task' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.deleteTask(id)
  .then(deleted => {
    if (deleted) {
      res.json({ task: "deleted" });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete task' });
  });
});

router.get('/:id/resources', (req, res) => {
  const { id } = req.params;

  Tasks.getResourcesByTaskId(id)
  .then(resources => {
    if (resources.length) {
      res.json(resources);
    } else {
      res.status(404).json({ message: 'Could not find resources for given task' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});

module.exports = router;