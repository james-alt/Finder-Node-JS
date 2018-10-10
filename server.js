const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const productRouter = require('./api/routes/productRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use('/products', productRouter);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
