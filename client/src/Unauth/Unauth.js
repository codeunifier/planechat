import React, { Component } from 'react';

import './Unauth.css';
import unauthorized from './unauthorized.jpg';

export default class Unauth extends Component {
    render() {
        return (
            <div className="unauth-container">
                <div>This is not the page you're looking for...</div>
                <img src={unauthorized} alt="Unauthorized"/>
            </div>
        )
    }
}