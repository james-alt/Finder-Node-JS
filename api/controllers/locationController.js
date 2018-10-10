// const debug = require('debug')('app');
const LocationRepository = require('../repositories/locationRepository');

const utilities = require('../../helpers/utilities');

exports.listAllLocations = (req, res) => {
  const locations = new LocationRepository()
    .get();

  res.send(locations);
};

exports.getLocation = (req, res) => {
  let { locationId } = req.params;
  locationId = parseInt(locationId, 10);

  const location = new LocationRepository()
    .filterById(locationId)
    .get();

  if (utilities.isEmpty(location)) {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  } else {
    res.send(location);
  }
};
