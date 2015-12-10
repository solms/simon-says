'use strict';
var routes = require('./app/routes/index.js');
var express = require('express');

var app = express();
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
routes(app);
var port = 3000;
app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});
