 const express=require("express");
const https=require("https");
 const app=express();
 const bodyParser=require("body-parser");

 app.use(bodyParser.urlencoded({extended:true}));

 app.get("/", function(req,res){
   res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res){
const query = req.body.CityName
const apikey= "ce0152ac08b96fed05ccde97f5dbb284";
const unit= "metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
https.get(url,function(response){
  response.on("data",function(data){
    const WeatherData = JSON.parse(data)
    const temp=WeatherData.main.temp
    const description= WeatherData.weather[0].description
    const icon =WeatherData.weather[0].icon
    console.log(temp);
    console.log(description);
    const icon_url="https://openweathermap.org/img/wn/"+icon+"@2x.png"
     res.write("<h1> the temperature in "+query+" is: "+temp)
     res.write("\n and it seems that it is </hi>  "+description)
     res.write("<img src="+icon_url+">")
     res.send()
  })
})
});

app.listen(3000, function(){
console.log('Server running on port 3000');
})
