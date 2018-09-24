import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/tables.css';
import '../stylesheets/App.css';

class SolarResultsAddress extends React.Component {
    render() {
        return (
            <tr>
                <td className="intro" >Validated Address: {this.props.address}</td>
            </tr>
        );
    }
}

SolarResultsAddress.propTypes = {
    address: PropTypes.string
};

export default SolarResultsAddress;