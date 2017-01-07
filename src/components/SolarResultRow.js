import React from 'react';
import '../stylesheets/tables.css';

class SolarResultRow extends React.Component{
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
    sunrise: React.PropTypes.string,
    sunset: React.PropTypes.string,
    nauticalAft: React.PropTypes.number,
    dayLength: React.PropTypes.number
};

export default SolarResultRow;
