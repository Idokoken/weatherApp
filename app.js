const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const weatherRouter = require("./routes/weatherRouter");

const app = express();

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
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port 4000`));
