/**
 * for express web api server
 */
const bodyParser = require('body-parser');

// for parsing FormData()
const multer = require('multer');
const upload = multer();

require('./db');

const customer = require('./Controller/CustomerController');
const user = require('./Controller/UserController');

const cors = require('cors');

const express = require('express');
const app = express();

// added middleware code
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use('/customers', customer);
app.use('/users', user);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server listening at port :${port}`);
});
