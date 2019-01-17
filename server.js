const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');

const productRouter = require('./api/routes/productRouter');
const locationRouter = require('./api/routes/locationRouter');
const productTypeRouter = require('./api/routes/productTypeRouter');

const app = express();
const port = process.env.PORT || 3000;

global.basedir = __dirname;

app.use(morgan('tiny'));
app.use('/products', productRouter);
app.use('/locations', locationRouter);
app.use('/productTypes', productTypeRouter);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
