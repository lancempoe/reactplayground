import React from 'react';
import '../stylesheets/forms.css';
import { Errors } from 'react-redux-form'; // eslint-disable-line no-unused-vars

class Error extends React.Component {

    render() {
        return (
            <Errors
                className="errors"
                model={this.props.fieldName}
                show="touched"
                messages={{
                    valueMissing: this.props.errorMessage
                }}
            />
        );
    }
}

Error.propTypes = {
    fieldName: React.PropTypes.string,
    errorMessage: React.PropTypes.string
};

export default Error;