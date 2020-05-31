const express = require('express');
const locationController = require('../controllers/locationController');

const router = express.Router();

router.get('/', (req, res) => {
  locationController.listAllLocations(req, res);
});

router.get('/:locationId', (req, res) => {
  locationController.getLocation(req, res);
});

module.exports = router;
