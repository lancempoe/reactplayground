import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';
import { GoogleKeyPage } from './../../src/container/GoogleKeyPage'; // eslint-disable-line no-unused-vars
import GoogleKeyForm from './../../src/components/GoogleKeyForm';

describe("<GoogleKeyPage>", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<GoogleKeyPage />);
    });

    it('should render an intro paragraph', () => {
        expect(wrapper.find('.intro').text()).toContain('To get started, provide your Google API Key');
    });

    it('renders a <GoogleKeyForm /> component', () => {
        expect(wrapper.find(GoogleKeyForm).length).toBe(1);
    });

});