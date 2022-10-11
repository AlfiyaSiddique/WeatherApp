require("dotenv").config();
const express = require("express");
const parser = require("body-parser")
const http = require("https");
const fs = require("fs");

const app = express();
const port = 80;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('Public'));

app.post("/", function (request, response) {
  const city = request.body.cityName;
  const unit = request.body.units;
  const apiKey = process.env.WEATHERAPIKEY;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`

  http.get(weatherURL, (res) => {

    res.on("data", (d) => {
      const dataObject = JSON.parse(d);
      console.log(dataObject);
      fs.writeFile("Public/Data.json", JSON.stringify(dataObject), (err) => {
      })
      response.status(204).send();
    });

  })
});

;



app.listen(port);