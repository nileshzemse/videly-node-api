const winston = require('winston');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => { winston.info(`Listening on port ${port}`) });