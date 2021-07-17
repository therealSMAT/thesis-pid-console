const express = require('express');
const cors = require('cors');

require('dotenv').config();

const Store = require('./store');
const mqtt = require('mqtt');

const { sendTripStartedEvent, sendTripStoppedEvent, sendLocalizationTrackingEvent } = require('./modules/tigr')

const client = mqtt.connect(process.env.MQTT_BROKER);

var exports = module.exports = {};

const port = 4000;

const app = express();

app.use(cors());

const catchErrors = (fn) => {
    try {
        fn();
    } catch(e) {
        console.log(e);
    }
}

client.on('connect', () => {
    client.subscribe("transport/location");
    console.log(`Connected to MQTT broker at ${process.env.MQTT_BROKER}`);
});

client.on('message', (topic, message) => {
    if (topic === 'transport/location') {
        let { lat, long } = JSON.parse(message.toString());
        
        catchErrors(async () => {
            await sendLocalizationTrackingEvent({ lat, long })
        });
    }
});

app.get('/', (req, res) => {
    res.json({ status: true });
});

app.get('/start-trip', (req, res) => {
    const routes = Store.routes();

    client.publish('transport/ride/start', JSON.stringify(routes), { qos: 1 });
    
    catchErrors(async () => {
        const { data } = await sendTripStartedEvent({ lat: null, long: null })
        console.log(data);
    });

    res.json({ routes })
});

app.get('/stop-trip', (req, res) => {
    client.publish('transport/ride/stop', JSON.stringify([]), { qos: 1 });
    
    catchErrors(async () => {
        const { data } = await sendTripStoppedEvent({ lat: null, long: null })
        console.log(data);
    });

    res.json({ status: true })
})

app.get('/set-bus-stop', ({ query }, res) => {
    console.log(query.routeId);
    client.publish('transport/currentStop', query.routeId, { qos: 1 })
    res.json({ success: true })
})

app.listen(port, () => {
    console.log(`Application running at http://localhost:${port}`)
})