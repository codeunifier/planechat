import React, { Component } from 'react';
import './Auth.css';

import login from './login.jpg';

export default class Auth extends Component {
    render() {
        return (
            <div className="auth-container">
                <div className="login-image-container">
                    <div>
                        Logging in...
                    </div>
                    <img src={login} alt="Logging in..."/>
                </div>
            </div>
        )
    }
}