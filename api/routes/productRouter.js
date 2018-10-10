const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', (req, res) => {
  productController.listAllProducts(req, res);
});

module.exports = router;
