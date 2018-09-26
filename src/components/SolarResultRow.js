import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/tables.css';

class SolarResultRow extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <tr className="row">
                <td>{this.props.sunrise}</td>
                <td>{this.props.sunset}</td>
                <td>{parseFloat(this.props.nauticalAft).toFixed(2)} Minutes</td>
                <td>{parseFloat(this.props.dayLength).toFixed(2)} Minutes</td>
            </tr>
        );
    }
}

SolarResultRow.propTypes = {
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    nauticalAft: PropTypes.number,
    dayLength: PropTypes.number
};

export default SolarResultRow;
