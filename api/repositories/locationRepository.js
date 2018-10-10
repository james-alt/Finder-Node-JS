const debug = require('debug')('app');

function getUniqueLocations(products) {
  let locations = products.map(product => product.locations);
  locations = locations.reduce((prev, curr) => prev.concat(curr));

  const prop = 'id';

  const uniqueLocations = locations.filter((obj, pos, arr) => {
    const locs = arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    return locs;
  });

  return uniqueLocations;
}

function getLocationProducts(products, id) {
  let locationProducts = products.filter(prod => prod.locations.some(loc => loc.id === id));
  locationProducts = locationProducts.map((prod) => {
    const product = prod;
    delete product.locations;
    return product;
  });

  return locationProducts;
}

function LocationRepository(products) {
  this.products = products;

  this.locations = getUniqueLocations(products);
}

LocationRepository.prototype.filterById = function filterById(id) {
  const location = this.locations.find(loc => loc.id === id);
  const locationProducts = getLocationProducts(this.products, id);

  location.products = locationProducts;
  this.locations = location;

  return this;
};

LocationRepository.prototype.filterByCoordinates = function filterByCoordinates(lat, lon, dist) {
  debug(`Lat: ${lat}; Lon: ${lon}; Distance: ${dist}`);
  if (!Number.isNaN(lat)
    && !Number.isNaN(lon)
    && !Number.isNaN(dist)) {
    debug('filtering on coordinates');
    // const locationRepository = new LocationRepository(this.products);
  }

  return this;
};

LocationRepository.prototype.get = function get() {
  return this.locations;
};

module.exports = LocationRepository;
