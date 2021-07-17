const { appConfig, tigrEventCodes } = require('../../config');
const axios = require('axios');

const httpInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
})

const getTigrDataFormat = () => {
    return {
        ID : 4,
        SERVERNAME : appConfig.serverName,
        VIN : appConfig.vinNumber,
        PROG : 1345,
        EVTDATE : Date.now(),
        SRVDATE : Date.now(),
        SENDDATE : Date.now(),
        CODE : "",
        TYPE : "HEADER_ONLY",
        TX : 3,
        DST : 240636,
        GPSInfo : { LAT : 0, LON : 0 }
    }
}

const sendTigrEvent = async (data) => {
    return await httpInstance.post('http://10.224.2.124:9000/tigr/events', data);
}

exports.sendTripStartedEvent = async ({ long, lat }) => {
    const tigrDataFormat = {
        ...getTigrDataFormat(),
        CODE: tigrEventCodes.engineStart,
        GPSInfo: { LAT: lat, LON: long }
    };

    return await sendTigrEvent(tigrDataFormat);
}

exports.sendTripStoppedEvent = async ({ long, lat }) => {
    const tigrDataFormat = {
        ...getTigrDataFormat(),
        CODE: tigrEventCodes.engineStop,
        GPSInfo: { LAT: lat, LON: long }
    };

    return await sendTigrEvent(tigrDataFormat);
}

exports.sendLocalizationTrackingEvent = async ({ long, lat }) => {
    const tigrDataFormat = {
        ...getTigrDataFormat(),
        CODE: tigrEventCodes.localizationTracking,
        GPSInfo: { LAT: lat, LON: long }
    };

    return await sendTigrEvent(tigrDataFormat);
}
