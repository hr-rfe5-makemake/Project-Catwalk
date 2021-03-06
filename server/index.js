const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const TOKEN = require('../config.js');
var proxy = require('express-http-proxy');

const app = express()
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use('/', proxy(`https://app-hrsei-api.herokuapp.com`, {
  proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
    proxyReqOpts.headers = {...proxyReqOpts.headers, "Authorization": TOKEN.TOKEN};
    return proxyReqOpts;
  }
}));

app.listen(port, (err,something) => {
  console.log('Server running on port ' + port);
})

