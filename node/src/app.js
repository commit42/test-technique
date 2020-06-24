const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//Fix problem on https://github.com/commit42/test-technique/tree/master/node 
const config = require("./config/dev");

const routes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/", routes);


const port = process.env.PORT || config.server.port;

app.listen(port);
console.log("Server started on port: " + port);

module.exports = app;
