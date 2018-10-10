const fs = require('fs');
const path = require('path');

exports.listAllProducts = (req, res) => {
  const { productType } = req.query;
  let { products } = JSON.parse(fs.readFileSync(path.join(global.basedir, 'data', 'products.json')));

  if (productType != null) {
    products = products.filter(product => product.type === productType);
    if (products === undefined || products.length === 0) {
      res.status(404).send({ url: `${req.originalUrl} not found` });
    }
  }

  res.send(products);
};

exports.getProduct = (req, res) => {
  let { productId } = req.params;
  productId = parseInt(productId, 10);

  const { products } = JSON.parse(fs.readFileSync(path.join(global.basedir, 'data', 'products.json')));
  const product = products.filter(prod => prod.id === productId);

  if (product === undefined || product.length === 0) {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  } else {
    res.send(product[0]);
  }
};
