//jshint esversion:6
const express = require("express");

const app = express();
const bodyparser = require("body-parser");
const https = require("https");

app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,res){
    
    res.sendFile(__dirname + "/index.html");

    });
app.post("/",function(req,res){
    const query = req.body.cityname;
    const apid = "ffe8f24116c26b542be12cb279c2d43c";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid="+apid+"&units=" +unit;
    https.get(url, function (response) {
      console.log(response.statusCode);
      response.on("data", function (data) {
        const weatherdata = JSON.parse(data);
        const tempe = weatherdata.main.temp;
        const weatherdescription = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The currently weather is " + weatherdescription + "</p>");
        res.write(
          "<h1>the temprature in "+query+" is " + tempe + " Degree Celsius.</h1>"
        );
        res.write("<img src=" + imageurl + ">");
        res.send();
      });
    });



});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

