import React from 'react';
import { connect } from 'react-redux';
import Actions from '../actions/GoogleKeyActions';
import GoogleKeyForm from '../components/GoogleKeyForm';// eslint-disable-line no-unused-vars
import _ from 'lodash';
import '../stylesheets/App.css';
import '../stylesheets/forms.css';

export class GoogleKeyPage extends React.Component {

    setGoogleApiKey(data) {
        Actions.setGoogleApiKey(data);
    }

    render() {
        return (
            <div>
                <p className="intro">
                    To get started, provide your Google API Key:
                </p><br/>
                <GoogleKeyForm errorMessage={this.props.errorMessage} setGoogleApiKey={this.setGoogleApiKey} />
            </div>
        );
    }
}

GoogleKeyPage.propTypes = {
    errorMessage: React.PropTypes.string
};

const mapStateToProps = function(store) {
    return {
        errorMessage: _.get(store, 'error.googleKey.message')
    };
};

export default connect(mapStateToProps)(GoogleKeyPage);


