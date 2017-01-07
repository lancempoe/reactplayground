import React from 'react';
import '../stylesheets/tables.css';

class SolarResultsHeader extends React.Component {
    render() {
        return (
            <tr>
                <td className="header" >Sunrise Time</td>
                <td className="header" >Sunset Time</td>
                <td className="header" >rfNauticalAfternoon</td>
                <td className="header" >Day Length</td>
            </tr>
        );
    }
}

export default SolarResultsHeader;