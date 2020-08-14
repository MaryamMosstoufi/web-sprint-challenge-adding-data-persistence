const express = require('express');

const Resources = require('./resourceModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Resources.getAllResources()
  .then(resources => {
    res.json(resources);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Resources.getResourceById(id)
  .then(resource => {
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Could not find resource with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resource' });
  });
});

router.post('/', (req, res) => {
  const resourceData = req.body;

  Resources.addResource(resourceData)
  .then(resource => {
    res.status(201).json(resource);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new resource' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Resources.getResourceById(id)
  .then(resource => {
    if (resource) {
      Resources.updateResource(changes, id)
      .then(updatedResource => {
        res.json(updatedResource);
      });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update resource' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Resources.deleteResource(id)
  .then(deleted => {
    if (deleted) {
      res.json({ resource: "deleted" });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete resource' });
  });
});

module.exports = router;

