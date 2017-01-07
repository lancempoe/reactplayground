import React from 'react';
import '../stylesheets/forms.css';

/* eslint-disable no-unused-vars */
import { Form, Control } from 'react-redux-form';
import FormTextField from '../components/FormTextField';
/* eslint-enable no-unused-vars */

class GoogleKeyForm extends React.Component {

    render() {
        return (
            <Form className="form" model="googleKey" onSubmit={(data) => this.props.setGoogleApiKey(data)}>
                <table>
                    <tbody>
                        <tr>
                            <td className="form-td">
                                <FormTextField
                                    password='true'
                                    label="Google API Key:"
                                    placeholder="Google Api Key"
                                    fieldName=".key"
                                    errorMessage="Google API Key is required"
                                />
                                <div className="errors">{this.props.errorMessage}</div>
                            </td>
                            <td className="form-td">
                                <Control.button model="googleKey" className="button">Continue</Control.button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        );
    }
}

GoogleKeyForm.propTypes = {
    setGoogleApiKey: React.PropTypes.func,
    errorMessage: React.PropTypes.string
};

export default GoogleKeyForm;