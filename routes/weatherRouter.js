const express = require("express");
const axios = require("axios")
require("dotenv").config();

const weatherRouter = express.Router();

weatherRouter.get("/", (req, res) => {
  res.render("index", {
    name: "enter location",
    icon: null,
    description: null,
    country: null,
    temp: null,
    wdate: null,
  });
});

weatherRouter.post("/", async (req, res) => {
  const {city} = req.body
  const api =    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + process.env.WEATH_API;
  // const api =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" +
  //   process.env.WEATH_API;
  try {
   const resp = await axios.get(api)
   const data = resp.data
   //console.log(data)
   
   if (data.message === "city not found") {
          res.render("index", {
            name: "city not found",
            icon: null,
            description: null,
            country: null,
            temp: null,
            wdate: null,
          });
        } else {
          const { icon, description } = data.weather[0];
          const { temp } = data.main;
          const { name } = data;
          const { country } = data.sys;
          const date = new Date(data.dt * 1000)
          const wdate = moment(date).format('MMM Do YYYY, h:mm a')   

          res.render("index", {
            icon,
            description,
            temp: Math.floor(temp),
            name,
            country,
            wdate
          });
        }           
  } catch (err) {
    res.render("index", {
      name: "failed to load data",
      icon: null,
      description: null,
      country: null,
      temp: null,
      wdate: null,    
    });    
  }
});

module.exports = weatherRouter;