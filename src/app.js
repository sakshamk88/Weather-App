const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Saksham Kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Saksham Kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Saksham Kumar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "An address must be provided.",
    });
  }

  geocode(req.query.address, (error, { lat, long, name } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(lat, long, name, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        name,
        address: req.query.address,
      });
      console.log("Everything is working correctlly!!");
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term.",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    message:
      "Oops!, Something went wrong. The help section does not have anything related.",
    name: "Saksham Kumar",
    title: "404 Not Found.",
  });
});
app.get("*", (req, res) => {
  res.render("404page", {
    message:
      "Oops!, Something went wrong. Please check the url and request a valid one.",
    name: "Saksam Kumar",
    title: "404 Not Found.",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
