const Product = require('../models/product.model');

exports.listAllProducts = (req, res) => {
  const product = new Product.Product(1, 'Test', 'Test Description 2');

  res.send(product);
};
