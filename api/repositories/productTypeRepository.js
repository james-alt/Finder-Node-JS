const fs = require('fs');
const path = require('path');
const utilities = require('../../helpers/utilities');

function ProductTypeRepository() {
  const { products } = JSON.parse(fs.readFileSync(path.join(global.basedir, 'data', 'products.json')));
  const productTypes = products.map(product => product.type);

  const formattedTypes = productTypes.map((productType) => {
    const productCount = productTypes.reduce((acc, curr) => {
      if (!acc[curr]) {
        acc[curr] = 0;
      }

      acc[curr] += 1;
      return acc;
    }, {});

    const type = { id: productType, count: productCount[productType] };
    return type;
  });

  this.productTypes = utilities.uniqueArray(formattedTypes, 'id');
}

ProductTypeRepository.prototype.get = function get() {
  return this.productTypes;
};

module.exports = ProductTypeRepository;
