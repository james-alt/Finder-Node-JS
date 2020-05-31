const express = require('express');
const productTypeController = require('../controllers/productTypeController');

const router = express.Router();

router.get('/', (req, res) => {
  productTypeController.listAllProductTypes(req, res);
});

module.exports = router;
