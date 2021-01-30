const express = require("express");
const moment = require("moment");
const fetch = require("node-fetch");
require("dotenv").config();

const weatherRouter = express.Router();

weatherRouter.route("/").get((req, res) => {
  const d = new Date();
  const wdate = moment(d).format("MMM Do YYYY");
  const wdate2 = moment(d).format("h:mm:ss a");

  res.render("index", {
    name: "enter location",
    icon: null,
    description: null,
    country: null,
    temp: null,
    wdate,
    wdate2,
  });
});

weatherRouter.post("/", async (req, res) => {
  const d = new Date();
  const wdate = moment(d).format("MMM Do YYYY");
  const wdate2 = moment(d).format("h:mm:ss a");

  const city = req.body.city;
  const ap2 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    process.env.WEATH_API;
  // const api =
  //   "https://api.openweathermap.org/data/2.5/weather?q=" +
  //   city +
  //   "&appid=" +
  //   process.env.WEATH_API;
  try {
    await fetch(ap2)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "city not found") {
          res.render("index", {
            name: "city not found",
            icon: null,
            description: null,
            country: null,
            temp: null,
            wdate,
            wdate2,
          });
        } else {
          const { icon, description } = data.weather[0];
          const { temp } = data.main;
          const { name } = data;
          const { country } = data.sys;

          res.render("index", {
            icon,
            description,
            temp: Math.floor(temp),
            name,
            country,
            wdate,
            wdate2,
          });
        }
      });
  } catch (err) {
    res.render("index", {
      name: "failed to load data",
      icon: null,
      description: null,
      country: null,
      temp: null,
      wdate,
      wdate2,
    });
  }
});

module.exports = weatherRouter;
