const express = require('express');
const app = express();
const port = 3000;
const ProductRouter = require('./app/product/router');
const logger = require('morgan');
const path = require('path');
const ProductRouterV2 = require('./app/product-v2/router');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', ProductRouter);
app.use('/api/v2', ProductRouterV2);
app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
