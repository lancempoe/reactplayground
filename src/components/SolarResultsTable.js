/* eslint-disable no-unused-vars */
import SolarResultRow from './SolarResultRow';
import SolarResultsHeader from './SolarResultsHeader';
import SolarResultsAddress from './SolarResultsAddress';
/* eslint-enable no-unused-vars */
import moment from 'moment';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/tables.css';

class SolarResultsTable extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        if (!_.isEmpty(this.props.rows)) {
            return(
                <div className="container" >
                    <table className="intro" >
                        <tbody>
                            <SolarResultsAddress address={this.props.address}/>
                        </tbody>
                    </table>
                    <table className="table" >
                        <tbody>
                            <SolarResultsHeader/>
                            {getRows(this.props.rows, this.props.offset)}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return null;
        }

    }
}

function getRows(rows, offset) {
    const solarResultRows = [];
    rows.forEach(row => {
        solarResultRows.push(
            <SolarResultRow
                key={_.uniqueId('row_')}
                sunrise={moment(row.sunrise).utcOffset(offset).format("MM/DD/YYYY HH:mm")}
                sunset={moment(row.sunset).utcOffset(offset).format("MM/DD/YYYY HH:mm")}
                dayLength={row.dayLength}
                nauticalAft={row.nauticalAfternoon}/>
        );
    });
    return solarResultRows;
}

SolarResultsTable.defaultProps = {
    rows: [],
    address: '',
    offset: 0
};

SolarResultsTable.propTypes = {
    rows: PropTypes.array,
    address: PropTypes.string,
    offset: PropTypes.number
};

export default SolarResultsTable;
