import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/forms.css';

/* eslint-disable no-unused-vars */
import { Control } from 'react-redux-form';
import Error from './Error';
/* eslint-enable no-unused-vars */

class FormDateField extends React.Component {

    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td className="form-td">
                        <label className="label">{this.props.label}</label>
                    </td>
                    <td className="form-td">
                        <Control
                            type="date"
                            className="field"
                            model={this.props.fieldName}
                            placeholder={this.props.placeholder}
                            required
                            validateOn="blur"
                        />
                        <Error
                            fieldName={this.props.fieldName}
                            errorMessage={this.props.errorMessage}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

FormDateField.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    fieldName: PropTypes.string,
    errorMessage: PropTypes.string,
};

export default FormDateField;