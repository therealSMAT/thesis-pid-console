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
For the sake of testing, a test broker at `https://test.mosquitto.org/` can be used but is not encouraged.

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
