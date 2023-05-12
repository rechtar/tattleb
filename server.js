const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const errorHandler = require("./middlewares/error-handler");
const customLogger = require("./middlewares/logger");
const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 4400;

app.use(cors("*"));
app.use(fileupload());
app.use(cookieParser());
app.use(express.static("public"));
app.use(fileupload());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(customLogger.all);

app.use(routes());
app.use(errorHandler.all);

const server = createServer(app);

server.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});
