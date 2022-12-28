const express = require("express");
const path = require("path");
const morgan = require("morgan")
const chalk = require("chalk");
const weatherRouter = require("./routes/weatherRouter");
//require("dotenv").config();

const app = express();

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", weatherRouter);
app.use(express.static(path.join(__dirname, "/public/")));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
global.moment = require("moment")


const port = process.env.PORT;
app.listen(port, () => console.log(chalk.magenta(`listening on port 4000`)));