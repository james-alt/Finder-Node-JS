const fs = require('fs');
const path = require('path');
const debug = require('debug')('app');
const utilities = require('../../helpers/utilities');
// const LocationRepository = require('./locationRepository');

function ProductRepository() {
  const { products } = JSON.parse(fs.readFileSync(path.join(global.basedir, 'data', 'products.json')));
  this.products = products;
}

ProductRepository.prototype.filterByProductType = function filterByProductType(productType) {
  if (!utilities.isEmpty(productType)) {
    this.products = this.products.filter(product => product.type === productType);
  }

  return this;
};

ProductRepository.prototype.filterByLocation = function filterByLocation(locationId) {
  debug(`Location ID: ${locationId}`);
  if (!Number.isNaN(locationId)) {
    debug('filtering on location');
    this.products = this.products.filter(prod => prod.locations.some(loc => loc.id === locationId));
  }

  return this;
};

ProductRepository.prototype.filterByCoordinates = function filterByCoordinates(lat, lon, distance) {
  debug(`Lat: ${lat}; Lon: ${lon}; Distance: ${distance}`);
  if (!Number.isNaN(lat)
    && !Number.isNaN(lon)
    && !Number.isNaN(distance)) {
    debug('filtering on coordinates');
    // const locationRepository = new LocationRepository(this.products);
  }

  return this;
};

ProductRepository.prototype.filterById = function filterById(id) {
  this.products = this.products.find(product => product.id === id);
  return this;
};

ProductRepository.prototype.get = function get() {
  return this.products;
};

module.exports = ProductRepository;
