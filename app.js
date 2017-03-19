var INTERVAL = 5000;

'use strict';
var fs = require('fs');
var path = require('path');
var wpi = require('wiring-pi');

var MAX_MESSAGE_COUNT = 20;
var sentMessageCount = 0;

var Client = require('azure-iot-device').Client;
var ConnectionString = require('azure-iot-device').ConnectionString;
var Message = require('azure-iot-device').Message;
var Protocol = require('azure-iot-device-mqtt').Mqtt;

// Read device connection string from command line arguments and parse it
var connectionStringParam = process.argv[2];
var connectionString = ConnectionString.parse(connectionStringParam);
var deviceId = connectionString.DeviceId;

// fromConnectionString must specify a transport constructor, coming from any transport package.
var client = Client.fromConnectionString(connectionStringParam, Protocol);

// Configure the client to use X509 authentication if required by the connection string.
if (connectionString.x509) {
  // Read X.509 certificate and private key.
  // These files should be in the current folder and use the following naming convention:
  // [device name]-cert.pem and [device name]-key.pem, example: myraspberrypi-cert.pem
  var options = {
    cert : fs.readFileSync(path.join(__dirname, deviceId + '-cert.pem')).toString(),
    key : fs.readFileSync(path.join(__dirname, deviceId + '-key.pem')).toString()
  };

  client.setOptions(options);

  console.log('[Device] Using X.509 client certificate authentication');
}

function connectCallback(err,msg) {
  if (err) {
    console.log('[Device] Could not connect: ' + err);
  } else {
    console.log('[Device] Client connected\n');
    // Wait for 5 seconds so that host machine gets connected to IoT Hub for receiving message.
    setTimeout(sendMessage(msg), 5000);
  }
}

function sendMessage(msg) {
  sentMessageCount++;
console.log(msg);  
var message = new Message(JSON.stringify(msg));
  
  console.log("[Device] Sending message #" + sentMessageCount + ": " + message.getData());
  client.sendEvent(message, sendMessageCallback);
}

function sendMessageCallback(err) {
  if (err) {
    console.log('[Device] Message error: ' + err.toString());
  } else {
    // Blink once after successfully sending one message.
  }

  if (sentMessageCount < MAX_MESSAGE_COUNT) {
    setTimeout(sendMessage, INTERVAL);
  } else {
    // Wait 5 more seconds to exit so that Azure function has the chance to process sent messages.
    setTimeout(function () {
      process.exit();
    }, 5000);
  }
}


var main = function () {
    
var v4l2camera = require("v4l2camera");

        
    var cam = new v4l2camera.Camera("/dev/video0");
    if (cam.configGet().formatName !== "YUYV") {
        console.log("YUYV camera required");
        process.exit(1);
    }
    cam.configSet({width: 600, height: 400});
    cam.start();
    times(6, cam.capture.bind(cam), function () {
        saveAsJpg(cam.toRGB(), cam.width, cam.height, "product.jpg");
        cam.stop();
    });
    console.log("w: " + cam.width + " h: " + cam.height);
};

var times = function (n, async, cont) {
    return async(function rec(r) {return --n == 0 ? cont(r) : async(rec);});
};
var saveAsJpg = function (rgb, width, height, filename) {
    var fs = require("fs");
    var jpegjs = require("jpeg-js");
    
    var size = width * height;
    var rgba = {data: new Buffer(size * 4), width: width, height: height};
    for (var i = 0; i < size; i++) {
        rgba.data[i * 4 + 0] = rgb[i * 3 + 0];
        rgba.data[i * 4 + 1] = rgb[i * 3 + 1];
        rgba.data[i * 4 + 2] = rgb[i * 3 + 2];
        rgba.data[i * 4 + 3] = 255;
    }
    var jpeg = jpegjs.encode(rgba, 100);
    fs.createWriteStream(filename).end(Buffer(jpeg.data));



    var https = require('http');


 var lang = 'language=es';
 var det = '&detectOrientation=true';
 var data = JSON.stringify({
 'url': 'https://static1.squarespace.com/static/547d6516e4b03545c8a81644/5526f05de4b040833ba23c80/55276416e4b0bfc7b23bb4c8/1428644888184/hola.png'
});

var options = {
  host: 'westus.api.cognitive.microsoft.com',
  path: '/vision/v1.0/ocr?' + lang + det,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length,
    'Ocp-Apim-Subscription-Key': 'a15877f338624d938cce0a27b967dff0'
  }

};

//console.log(options);
var req = https.request(options, function(res) {
  var msg = '';

  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    msg += chunk;
	//console.log(msg);
	client.open(connectCallback("",msg));
  });
  res.on('end', function() {
    //console.log(JSON.parse(msg));
  });
});

req.write(data);
req.end();



	
};

setInterval(main, INTERVAL);