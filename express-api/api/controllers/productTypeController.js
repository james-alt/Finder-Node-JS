const ProductTypeRepository = require('../repositories/productTypeRepository');
const utilities = require('../../helpers/utilities');

exports.listAllProductTypes = (req, res) => {
  const productTypes = new ProductTypeRepository()
    .get();

  if (utilities.isEmpty(productTypes)) {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  } else {
    res.send(productTypes);
  }
};
