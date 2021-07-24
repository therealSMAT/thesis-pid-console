# Operator Console
This repository contains the source code to the `operator-console` in a cybersecurity test bed of a city transportation system.
The testbed was setup to test the result of a threat modelling exercise in a real world use case of the Tallinn Transport ecosystem.
The code is written using `expressjs` on the server and `vuejs 2.7` on the client.

## Architecture
The architectural setup of the testbed is shown in the image below;

![Test bed message passing](https://res.cloudinary.com/devreserve/image/upload/v1627129495/Screenshot_2021-07-24_at_15.19.25_xg7tjo.png)

This repository powers `client1` and relies on a central broker to send messages to other clients.

## Requirements
Nodejs 14+, eclipse-mosquitto MQTT broker 3.1.

For the sake of testing, a sample broker at https://test.mosquitto.org/ can be used but is not encouraged.

**It is advisable to setup the mosquitto mqtt broker with docker. Visit https://hub.docker.com/_/eclipse-mosquitto for more information**

For the sake of consistency, please do not use `localhost` as the hostname for your mosquitto broker. Instead, use the IP address of your computer.

## Installation
To install, clone this repository. You will notice two directories: `client` and `server`. Then run the following commands;
- `cd server`. This directory contains the nodejs express server
- Copy the content of the `.env.example` file into a `.env` file. This is required to set the MQTT broker.
- Open `.env` and set the appropriate urls for the `MQTT_BROKER` and `TIGR_SERVER`. Save and close the file.
- Run `npm install` to pull all application dependencies.
- Finally run `node app.js` to start the server.
- Open a new terminal tab and navigate to the `client` directory.
- Copy the content of the `.env.example` file into a `.env` file in the client directory. This is required to set the MQTT broker.
- Open `.env` and set the url for the `VUE_APP_MQTT_BROKER` as the same url used on the server.
- Run `npm install` to install all required dependencies.
- Run `npm run serve` to start your application. It should now be running on http://localhost:8080

## Usage
When the start trip button is clicked, a request will be made to the server to fetch all the route information. 

This will broadcast a message over MQTT to the `/transport/ride/start` topic, which is being subscribed to by the [passenger information display module](https://github.com/therealSMAT/thesis-pid-client). The passenger information display module collects this route information and displays inform of a trip timeline to the passengers. 

The [gnss-module](https://github.com/therealSMAT/thesis-gnss-module) responsible for collecting and sending gps information also subscribes to the `/transport/ride/start`. On getting a message, the gnss module begins to publish geolocation information on the `/transport/location` topic. The operator console listens on the `/transport/location`, and displays the real-time geolocation information.

Finally, in accordance with the TIGR (http://www.digigroupinformatica.it/download/TIGR%20protocol%20-%20Technical%20specifications%20-%20EBSF_2%20Ed1.6%20(gen%202019).pdf) for smart transportation systems, a TIGR compliant `TRIP_STARTED` identifier will be sent to a TIGR server for further processing.

Similarly, relevant information will be sent and published over respective channels when other events such as `change current location`, `stop trip` occur.

## Security Testing
Small scripts were written to automate the testing for certain systems of the test bed. The script can be found [here](https://github.com/therealSMAT/thesis-sec-tests)
