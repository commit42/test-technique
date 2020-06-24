const express = require("express");
const response = require("../helpers/response");

//Swagger UI 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Core
const api = require("../core/api");

const routes = express.Router();

routes.use(response.setHeadersForCORS);

//For Swagger UI on Homepage
routes.use('/', swaggerUi.serve);
routes.get('/', swaggerUi.setup(swaggerDocument));


//Country requests
routes.get("/countries", (req, res) => {
  api.getCountries().then(result => {
    if(result == undefined) {
      response.sendNotFound(res);
    } else {
      res.status(200).json(result);
    }
  });
});

routes.get("/country/:countryCode", (req, res) => {
  var countryCode = req.params.countryCode;

  //Si le code pays n'est pas bon
  if(countryCode == undefined || countryCode.length != 3) {
     response.sendBadParameter(res);
  } else {
    api.getCountryByCode(countryCode).then(result => {
      if(result == undefined) {
        response.sendNotFound(res);
      } else {
        res.status(200).json(result);
      }
    });
  }

});


routes.use(function (req, res) {
  response.sendNotFound(res);
});

module.exports = routes;