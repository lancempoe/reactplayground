import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../actions/SolarAnalyzerActions';
import _ from 'lodash';
/* eslint-disable no-unused-vars */
import SolarAnalyzerForm from '../components/SolarAnalyzerForm';
import SolarResultsTable from '../components/SolarResultsTable';
/* eslint-enable no-unused-vars */

class SolarAnalyzerPage extends React.Component {

    calculateSolarAnalysis(formData) {
        const validatedLocation = formData.address === _.get(this.props.validatedLocation, 'rawAddress') &&
                                 this.props.validatedLocation;
        Actions.calculateSolarAnalysis(this.props.googleKey, validatedLocation, formData);
    }

    render() {
        return (
            <div>
                <SolarAnalyzerForm
                    errorMessage={this.props.errorMessage}
                    onSubmitForm={this.calculateSolarAnalysis.bind(this)} />
                <SolarResultsTable
                    address={this.props.validatedAddress}
                    rows={this.props.solarResults}
                    offset={this.props.utcOffsetMinutes}/>
            </div>
        );
    }
}

SolarAnalyzerPage.propTypes = {
    googleKey: PropTypes.string,
    validatedAddress: PropTypes.string,
    validatedLocation: PropTypes.object,
    utcOffsetMinutes: PropTypes.number,
    errorMessage: PropTypes.string,
    solarResults: PropTypes.array
};

const mapStateToProps = function(store) {
    return {
        googleKey: _.get(store, 'googleKey.data.key'),
        validatedAddress: _.get(store, 'solarAnalyzer.location.address'),
        validatedLocation: _.get(store, 'solarAnalyzer.location'),
        utcOffsetMinutes: _.get(store, 'solarAnalyzer.location.offset'),
        errorMessage: _.get(store, 'error.solar.message'),
        solarResults: _.get(store, 'solarAnalyzer.solarResults')
    };
};

export default connect(mapStateToProps)(SolarAnalyzerPage);


