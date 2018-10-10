const ProductRepository = require('../repositories/productRepository');

const utilities = require('../../helpers/utilities');

exports.listAllProducts = (req, res) => {
  const { productType } = req.query;
  let { locationId } = req.query;
  locationId = parseInt(locationId, 10);

  const products = new ProductRepository()
    .filterByProductType(productType)
    .filterByLocation(locationId)
    .get();

  res.send(products);
};

exports.getProduct = (req, res) => {
  let { productId } = req.params;
  productId = parseInt(productId, 10);

  const product = new ProductRepository()
    .filterById(productId)
    .get();

  if (utilities.isEmpty(product)) {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  } else {
    res.send(product);
  }
};
