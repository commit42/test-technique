const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//const config = require("config/dev");
const routes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/", routes);

const port = 3000;
app.listen(port);
console.log("Server started on port: " + port);

module.exports = app;
