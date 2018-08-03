import React, { Component } from 'react';
import Users from '../Users/Users';
import Chat from '../Chat/Chat';
import Search from '../Search/Search';
import './Main.css';
import '../Users/Users.css';
import '../Chat/Chat.css';
import '../Search/Search.css';

class Main extends Component {
    render() {
        return (
            <div className="main-container">
                <Users/>
                <Chat username="admin"/>
                <Search/>
            </div>
        )
    }
}

export default Main;