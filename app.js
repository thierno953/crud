const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorMiddleware = require("./utils/errorHander");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

dotenv.config({ path: "./config/config.env" }); 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const info = require("./routes/infoRoute");

app.use("/api", info); 

app.use(errorMiddleware);

module.exports = app;
