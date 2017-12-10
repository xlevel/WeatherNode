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


## Configuration

### Sensors

#### DHT22

#### BMP085

#### DS18B20

### Data Target

#### Adafruit IO

#### MQTT
