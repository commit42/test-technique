const express = require("express");
const response = require("../helpers/response");

const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

routes.use(function (req, res) {
  response.sendNotFound(res);
});

module.exports = routes;
