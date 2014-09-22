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
    'address': '0x29',
    'packageType': 'CS'
});

function sensRead() {
    setInterval(function() {
        sense.getLux(function(err, val) {
            if (err) {
                console.log('Error on sensor init: ' + err);
            } else {
                console.log('light value is: ' + val + ' lux')
            }
        });
    }, 1000);
}

sense.init(function(err, val) {
    if (err) {
        console.log('Error on sensor init: ' + err);
    } else {
        console.log('Sensor init completed');
        sensRead();
    }
});