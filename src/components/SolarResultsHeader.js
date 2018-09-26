import React from 'react';
import '../stylesheets/tables.css';

class SolarResultsHeader extends React.PureComponent { //changed from updating 15 times to only 1!
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