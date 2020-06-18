const express = require("express");
const response = require("../helpers/response");

const data = require('./data');

const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

routes.get("/country/:code", (req, res) => {
    // TODO : gerer le cas ou l'on trouve rien et apres c'est fini. 
    // => genre renvoie une 404 si il trouve rien ou renvoyer la partie des datas obtenues soit api soit csv
    // appel a l'api restcountries
    data.getData(req.params.code).then( result => {
      if(result!== undefined )
        res.status(200).json(result);
      else 
        res.status(404);
      }
    );
  });

routes.use(function (req, res) {
  response.sendNotFound(res);
});

module.exports = routes;