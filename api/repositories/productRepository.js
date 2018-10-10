const fs = require('fs');
const path = require('path');
const debug = require('debug')('app');
const utilities = require('../../helpers/utilities');

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

ProductRepository.prototype.filterById = function filterById(id) {
  this.products = this.products.find(product => product.id === id);
  return this;
};

ProductRepository.prototype.get = function get() {
  return this.products;
};

module.exports = ProductRepository;
