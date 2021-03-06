import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../stylesheets/forms.css';

/* eslint-disable no-unused-vars */
import { Form, Control } from 'react-redux-form';
import FormTextField from '../components/FormTextField';
import FormDateField from '../components/FormDateField';
/* eslint-enable no-unused-vars */

class SolarAnalyzerForm extends React.PureComponent { //this will stop only one extra render :(

    render() {

        return (
            <Form
                className="form"
                model="solarAnalyzer"
                onSubmit={(formData) => this.props.onSubmitForm(formData)}
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="form-td">
                                <FormTextField
                                    label='Address:'
                                    placeholder='Address'
                                    fieldName='.address'
                                    errorMessage="Invalid Address"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="form-td">
                                <FormDateField
                                    label='Starting Date:'
                                    placeholder={moment().subtract(7, 'days').format("MM-DD-YYYY")}
                                    fieldName='.startingDate'
                                    errorMessage="Invalid Date"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="form-td">
                                <FormDateField
                                    label='Ending Date:'
                                    placeholder={moment().format("MM-DD-YYYY")}
                                    fieldName='.endingDate'
                                    errorMessage="Invalid Date"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="errors">
                                {this.props.errorMessage}
                            </td>
                        </tr>
                        <tr>
                            <td className="form-td">
                                <Control.button model="solarAnalyzer" className="button">Analyze</Control.button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        );
    }
}

SolarAnalyzerForm.propTypes = {
    onSubmitForm: PropTypes.func,
    errorMessage: PropTypes.string
};

export default SolarAnalyzerForm;