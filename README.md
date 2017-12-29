# WeatherNode
This a Node JS based Weather Station data node designed to run on a Raspberry Pi. Currently it supports a small number of sensors.
It supports sending data to the [Adafruit IO service](https://io.adafruit.com/) and [MQTT](http://mqtt.org/) (currently in development).

## Structure

### Weather Node
This is the main data gathering application. Currently it has been developed to push the data to the Adafruit IO data platform.

### Sensors
Currently there are two supported sensors:
* DHT22 - This driver is for the DHT22 family of temperature and humidity sensors. The following devices have been tested: DHT11, DHT22, AM2302
* BMP085 - This driver is for the BMP085 family of temperature and pressure sensors. The following devices have been tested: BMP085, BMP180
* DS18B20 - This driver is for the one wire DS18B20 temperature sensor.

## Installation

### Getting started with Weather Node
1. Download the either the [latest release from here](https://github.com/xlevel/WeatherNode/releases) or download a copy of the latest version of the master branch.
2. Unzip the file into the prefered location.
3. Setup the require sensors running `npm install` in the root of the required sensors.
4. Navigate to the root folder of the WeatherNode application and run `npm install`.
5. Navigate to the *src* folder and rename the template configuration file *config.json.orig* to *config.json*.
6. Edit the config file, specifying details of the sensors and data target.
7. Run the application using `node app`.

### Enabling the DHT22 sensor
The DHT22 sensor uses the [node-dht-sensor module](https://github.com/momenso/node-dht-sensor). The README has instructions on how to setup the sensor, but in short you need to install the [BCM2835 C library](http://www.airspayce.com/mikem/bcm2835/) on your Raspberry Pi first.


## Configuration

### Sensors

#### DHT22
Example Configuration:

```
  {
      "type": "../../../Sensors/DHT22/dht22.js",
      "id": "Sensor 2", // The sensor's name
      "settings": {
          "pin": 4 // The GPIO pin the sensor is connected to
      }
  }
```
#### BMP085
Example Configuration:

```
  {
      "type": "../../../Sensors/BMP085/bmp085.js",
      "id": "Sensor 3", // The sensor's name
      "settings": { } 
  }
```
#### DS18B20
Example Configuration:

```
  {
     "type": "../../../Sensors/DS18B20/ds18b20-sensor.js",
      "id": "Sensor 4", // The sensor's name
      "settings": {
          "id": 00-0000000000 // The "1-wire" sensor id
      }
  }
```

### Data Target

#### Adafruit IO
Example Configuration:

```
  "type": "./adafruitIo.js",
  "config": {
      "aioKey":"XXXXXXXX", // The Adafruit IO 'AIO' key
      "user":"XXXXXXXX", // Your Adafruit IO username
      "feeds":[
          {
              "id":"test-temp", // The Adafruit IO feed id
              "sensor": "Sensor 1", // The sensor's whose data is sent to the feed's name 
              "type": "t" // The type of data to be sent. Either 't' (temperature), 'p' (pressure) or 'h' (humidity).
          }
      ]
  }
```

#### MQTT
Example Configuration:

```
  "type": "./mqtt.js",
  "config": {
      "host":"mqtt://mqttbroker.local", // The URI of the target MQTT broker server
      "topics":[
          {
              "topic":"test/temp", // The MQTT topic to be published
              "sensor": "Sensor 1", // The sensor's whose data is published to the topic's name 
              "type": "t" // The type of data to be sent. Either 't' (temperature), 'p' (pressure) or 'h' (humidity).
          }
      ]
  }

```
