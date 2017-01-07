import React from 'react';
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
    address: React.PropTypes.string
};

export default SolarResultsAddress;