import constants from '../constants/ActionTypes';
import store from '../store';
import { getValidLocation, getValidTimeZone, getSunriseSunsetData }  from '../apis/SolarAnalyzerAPIs';
import { browserHistory } from 'react-router';
import moment from 'moment';
import _ from 'lodash';
const Promise = require('es6-promise').Promise;

const SolarAnalyzerActions = {

    calculateSolarAnalysis(rawKey, validatedLocation, formData) {
        const start = moment(formData.startingDate);
        const end = moment(formData.endingDate);
        const address = formData.address;
        const key = encodeURIComponent(rawKey);

        new Promise((resolve) => clearPriorResults(resolve))
            .then(() => new Promise((resolve, reject) => {
                validateDateRange(resolve, reject, start, end);}))
            .then(() => new Promise((resolve, reject) => {
                getValidatedLocation(resolve, reject, validatedLocation, address, key);}))
            .then((location) => new Promise((resolve, reject) => {
                getUtcOffset(resolve, reject, validatedLocation, location, start, key);}))
            .then((location) => {
                getAllSunriseSunsetInfo(start, end, location);})
            .catch((error) => {
                handleError(error);});
    }

};
export default SolarAnalyzerActions;

function clearPriorResults(resolve) {
    store.dispatch({ type: constants.CLEAR_ERRORS_AND_RESULTS });
    resolve();
}

function validateDateRange(resolve, reject, start, end) {
    const daysApart = end.diff(start, 'days');
    const isFutureDate = end.isAfter(moment());
    if (isFutureDate) {
        reject({type: constants.SET_SOLAR_ERROR, message: 'Future Dates Are Invalid.'});
    } else if(daysApart < 0 || daysApart > 14) {
        reject({type: constants.SET_SOLAR_ERROR, message: 'Invalid Date Range. 2 week range only'});
    } else {
        store.dispatch({
            type: constants.SET_SOLAR_ERROR,
            data: {}
        });
        resolve();
    }
}

function getValidatedLocation(resolve, reject, validatedLocation, address, key) {
    if (validatedLocation) {
        resolve(validatedLocation);
    } else {
        validateLocation(resolve, reject, address, key);
    }
}

function validateLocation(resolve, reject, address, encodedKey) {
    getValidLocation(address, encodedKey, (validLocation) => {
        store.dispatch({
            type: constants.SET_SOLAR_LOCATION,
            data: validLocation
        });

        if (validLocation.status == 'REQUEST_DENIED') {
            browserHistory.push('/login');
            reject({type: constants.SET_GOOGLE_KEY_ERROR, message: 'Invalid Google Api Key'});
        } else if (validLocation.status == 'ZERO_RESULTS') {
            reject({type: constants.SET_SOLAR_ERROR, message: 'Invalid Address'});
        }
        resolve(validLocation);
    });
}

function getUtcOffset(resolve, reject, validatedLocation, location, startDate, encodedKey) {
    if (validatedLocation) {
        resolve(validatedLocation);
    } else {
        callForUtcOffset(startDate, location, encodedKey, resolve, reject);
    }
}

function callForUtcOffset(startDate, location, encodedKey, resolve, reject) {
//Only used to get the timezone. You can assume that time zones do not change on this day.
    const utc = startDate.unix();
    const lat = location.lat;
    const lng = location.lng;

    getValidTimeZone(lat, lng, utc, encodedKey, (partialLocation) => {
        if (partialLocation) {
            location.offset = partialLocation.offset;
            store.dispatch({
                type: constants.SET_SOLAR_LOCATION,
                data: location
            });

            resolve(location);
        } else {
            reject({
                type: constants.SET_SOLAR_ERROR,
                message: 'Failed to call Google TimeZone Api'
            });
        }
    });
}

function buildArrayOfDates(start, end, location) {
    const dates = [];
    const localStart = start.utcOffset(location.offset);
    const localEnd = end.utcOffset(location.offset);
    while(!localEnd.isBefore(localStart)) {
        dates.push(localEnd.format("YYYY-MM-DD"));
        localEnd.subtract(1, 'day');
    }
    return dates;
}

function getAllSunriseSunsetInfo(start, end, location) {
    const dates = buildArrayOfDates(start, end, location);
    _.forEach(dates, (date) => {
        new Promise((resolve, reject) => getSunriseSunsetInfo(resolve, reject, location, date));
    });
}

function getSunriseSunsetInfo(resolve, reject, location, utc) {
    const lat = location.lat;
    const lng = location.lng;

    getSunriseSunsetData(lat, lng, utc, (solarResults) => {
        if (solarResults) {
            store.dispatch({
                type: constants.ADD_SOLAR_RESULTS,
                data: solarResults
            });

            resolve(location);
        } else {
            reject({
                type: constants.SET_SOLAR_ERROR,
                message: 'Failed to call sunrise-sunset Api'
            });
        }
    });
}

function handleError(error) {
    store.dispatch({
        type: error.type,
        data: {message: error.message}
    });
}
