import React, { Component } from 'react';

import './Lost.css';
import obiwan from './obiwan.png';

export default class Lost extends Component {
    render() {
        return (
            <div className="lost-container">
                <div className="error-text">Error 404</div>
                <img src={obiwan} alt="Not Found"/>
                <div className="normal-text">This is not the page you're looking for...</div>
                <div className="normal-text"><a href='/'>Return to main page</a></div>
            </div>
        )
    }
}