var sensorLib = require('node-dht-sensor');
var TSL2561 = require('sensor_tsl2561');

var dht_sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {
        var readout = sensorLib.read();
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

var sense = new TSL2561({
    'address': '0x29'
});

sense.init(function(err, val) {
  if (!err) {
    sense.getLux(function(error, val) {
      if (!error) console.log(val + ' lux');
    });    
  }
});