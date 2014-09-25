var sensorLib = require('node-dht-sensor');
var express = require('express');
var app = express();
var piREST = require('pi-arest')(app);

piREST.set_id('1');
piREST.set_name('my_RPi');

app.get('/', function(req, res){
  
  res.send("Welcome to the home page");

});

var dht_sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {
        var readout = sensorLib.read();
        
        piREST.variable('temperature',readout.temperature.toFixed(2));
        piREST.variable('humidity', readout.humidity.toFixed(2));
        
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
            'humidity: ' + readout.humidity.toFixed(2) + '%');
        setTimeout(function () {
            dht_sensor.read();
        }, 2000);
    }
};

if (dht_sensor.initialize()) {
    dht_sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}

var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});