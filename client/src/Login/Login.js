import React, { Component } from 'react';
import './Login.css';

import Auth from '../_services/AuthService';

const auth = new Auth();
    

class Login extends Component {
    componentDidMount() {
        auth.login();
    }

    render() {
        return (
            <div>
                Redirecting to login page...
            </div>
        )
    }
}

export default Login;