import axios from 'axios';
import _ from 'lodash';
import { getAddress, getTimeZone, getSolarData } from '../utils/Transformer';

export function getValidLocation(address, encodedKey, callback) {
    const encodedAddress = encodeURIComponent(address);
    const locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${encodedKey}`;
    axios
        .get(locationUrl, {transformResponse: getAddress})
        .then((response) => {
            callback(_.set(response.data, 'rawAddress', address));
        })
        .catch(() => {
            callback({ status: 'REQUEST_DENIED' });
        });
}

export function getValidTimeZone(lat, lng, utc, encodedKey, callback) {
    const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json` +
                        `?location=${lat},${lng}&timestamp=${utc}&key=${encodedKey}`;
    axios
        .get(timezoneUrl, {transformResponse: getTimeZone})
        .then((response) => {
            callback(response.data);
        })
        .catch(() => {
            callback();
        } );
}

export function getSunriseSunsetData(lat, lng, momentDate, callback) {
    const sunriseSunsetUrl = `http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${momentDate}&formatted=0`;
    axios
        .get(sunriseSunsetUrl, {transformResponse: getSolarData})
        .then((response) => {
            callback(response.data);
        })
        .catch(() => {
            callback();
        } );
}