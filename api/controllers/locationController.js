// const debug = require('debug')('app');\
const ProductRepository = require('../repositories/productRepository');
const LocationRepository = require('../repositories/locationRepository');

const utilities = require('../../helpers/utilities');

exports.listAllLocations = (req, res) => {
  let { lat } = req.query;
  let { lon } = req.query;
  let { distance } = req.query;

  lat = parseFloat(lat);
  lon = parseFloat(lon);
  distance = parseInt(distance, 10);

  const productRepository = new ProductRepository();
  const locations = new LocationRepository(productRepository.get())
    .filterByCoordinates(lat, lon, distance)
    .get();

  res.send(locations);
};

exports.getLocation = (req, res) => {
  let { locationId } = req.params;
  locationId = parseInt(locationId, 10);

  const productRepository = new ProductRepository();
  const location = new LocationRepository(productRepository.get())
    .filterById(locationId)
    .get();

  if (utilities.isEmpty(location)) {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  } else {
    res.send(location);
  }
};
