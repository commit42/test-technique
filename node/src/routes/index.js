const express = require("express");
const response = require("../helpers/response");
const routes = express.Router();

const apiService = require("../services/apiService");

routes.use(response.setHeadersForCORS);

routes.get("/", (req, res) => {
    res.status(200).json({message: "Hello World"});
});

// Request a country by code (fra - ita - usa)
routes.get("/country/:code", (req, res) => {
    let code = req.params.code;

    apiService.getDataByCode(code).then(result => {
        res.status(200).json(result);
    });
});

routes.use(function (req, res) {
    response.sendNotFound(res);
});

module.exports = routes;
