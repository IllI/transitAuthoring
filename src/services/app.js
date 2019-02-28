var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var getDir = require('./direction.js');
var getStops = require('./stops.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

app.get("/user", function (req, res) {
    var data = ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email()
    });
    res.status(200).send(data);
});
app.get("/stops/:id/:stopName", function(req, res) {
    var dir = getStops.getStops(req.params.id, req.params.stopName, res);

});
app.get("/route/:id/:headsign", function(req, res) {
   var dir = getDir.getStops(req.params.id, req.param.stopName, res );
});
app.get("/getStop/:id/:departureStop/:arrivalStop", function(req,res){
    var dir = getDir.getDirection (req.params.id, req.params.departureStop, req.params.arrivalStop, res);
});
app.get("stop/time/:id", function(req,res){
    var times = getDir.getStopTimes (req.params.id);
})