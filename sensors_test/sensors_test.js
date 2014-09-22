var sensorLib = require('node-dht-sensor');
var TSL2561 = require('sensor_tsl2561');

var sense = new TSL2561();
sense.init(function(err, val) {
  if (!err) {
    sense.getLux(function(error, val) {
      if (!error) console.log(val + ' lux');
    });    
  }
});

var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {
        var readout = sensorLib.read();
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
            'humidity: ' + readout.humidity.toFixed(2) + '%');
        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}