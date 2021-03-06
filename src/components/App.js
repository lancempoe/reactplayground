import React from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import '../stylesheets/App.css';

class App extends React.Component {
    render() {
        return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to the Solar Analyzer</h2>
            </div>
            {this.props.children}
        </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default App;