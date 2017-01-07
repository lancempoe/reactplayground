import _ from 'lodash';
import moment from 'moment';

export function getAddress(response) {
    const json = JSON.parse(response);
    const location = {};
    location.status = _.get(json, 'status');
    location.address = _.get(json, 'results[0].formatted_address');
    location.lat = _.get(json, 'results[0].geometry.location.lat');
    location.lng = _.get(json, 'results[0].geometry.location.lng');

    return location;
}

export function getTimeZone(response) {
    const json = JSON.parse(response);
    const location = {};
    if (_.has(json, 'rawOffset')) {
        location.offset = _.get(json, 'rawOffset') / 60;
    }
    return location;
}

export function getSolarData(response) {
    const json = JSON.parse(response);
    const solarData = {};

    solarData.sunrise =  _.get(json, 'results.sunrise');
    solarData.sunset =  _.get(json, 'results.sunset');
    solarData.nauticalAfternoon = getNauticalAfternoon(json);
    solarData.dayLength = getDayLength(json);

    return [solarData];
}

function getNauticalAfternoon(json) {
    const solar_noon = _.get(json, 'results.solar_noon');
    const nautical_twilight_end = _.get(json, 'results.nautical_twilight_end');
    if (solar_noon && nautical_twilight_end) {
        const startTime = moment(solar_noon);
        const endTime = moment(nautical_twilight_end);
        return moment.duration(endTime.diff(startTime)).asMinutes();
    }
}

function getDayLength(json) {
    if (_.has(json, 'results.day_length')) {
        return _.get(json, 'results.day_length') / 60;
    }
}
