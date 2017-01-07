import React from 'react';
import '../stylesheets/forms.css';

/* eslint-disable no-unused-vars */
import { Control } from 'react-redux-form';
import Error from './Error';
/* eslint-enable no-unused-vars */

class FormTextField extends React.Component {

    render() {
        return (
            <table className="full">
                <tbody>
                    <tr>
                        <td className="form-td-label">
                            <label className="label">{this.props.label}</label>
                        </td>
                        <td className="form-td">
                            {getField(this.props.password, this.props.fieldName, this.props.placeholder)}
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

function getField(password, fieldName, placeholder) {
    if (password) {
        return (
            <Control
                type="password"
                className="field"
                model={fieldName}
                placeholder={placeholder}
                required
                validateOn="blur"
            />
        );
    } else {
        return (
            <Control.text
                className="field"
                model={fieldName}
                placeholder={placeholder}
                required
                validateOn="blur"
            />
        );
    }

}

FormTextField.propTypes = {
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    fieldName: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    password: React.PropTypes.string
};

export default FormTextField;