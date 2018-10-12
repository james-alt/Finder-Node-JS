const debug = require('debug')('app');
const utilities = require('../../helpers/utilities');

function getUniqueLocations(products) {
  let locations = products.map(product => product.locations);
  locations = locations.reduce((prev, curr) => prev.concat(curr));

  return utilities.uniqueArray(locations, 'id');
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

function getDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
  // convert points to radians
  const ct = Math.PI / 180.0;
  const point1 = { lat: lat1 * ct, lon: lon1 * ct };
  const point2 = { lat: lat2 * ct, lon: lon2 * ct };

  // radius of the earth
  const radius = 3959.0; // value in miles, 6371 is km
  const distance = Math.acos(Math.sin(point1.lat)
    * Math.sin(point2.lat) + Math.cos(point1.lat)
    * Math.cos(point2.lat) * Math.cos(point2.lon - point1.lon))
    * radius;

  return distance;
}

function AddDistanceToLocation(location, lat, lon) {
  const distance = getDistanceBetweenPoints(lat, lon, location.latitude, location.longitude);

  const newLocation = location;
  newLocation.distance = distance;
  return newLocation;
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
  if (!Number.isNaN(lat)
    && !Number.isNaN(lon)
    && !Number.isNaN(dist)) {
    let locations = this.locations
      .map(location => AddDistanceToLocation(location, lat, lon));

    locations = locations.filter(location => location.distance < dist);
    locations = locations.sort((a, b) => utilities.compareNumbers(a.distance, b.distance));

    this.locations = locations;
  }

  return this;
};

LocationRepository.prototype.filterByProductId = function filterByProductId(productId) {
  if (!Number.isNaN(productId)) {
    debug(`filtering by product id ${productId}`);
    const product = this.products.find(prod => prod.id === productId);
    if (!utilities.isEmpty(product)) {
      const locationIds = product.locations.map(loc => loc.id);
      this.locations = this.locations
        .filter(location => locationIds.includes(location.id));
    }
  }

  return this;
};

LocationRepository.prototype.get = function get() {
  return this.locations;
};

module.exports = LocationRepository;
