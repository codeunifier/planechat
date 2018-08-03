import React, { Component } from 'react';
import AuthService from '../_services/AuthService';
import SendBirdService from '../_services/SendBirdService';
import EventEmitterService from '../_services/EventEmitterService';

import './Users.css';

const general_url = 'sendbird_open_channel_40968_84cbd89b9e3d1cbc287a7bc9402a43284132fae5';

const auth = new AuthService();
const sbService = new SendBirdService();
const events = new EventEmitterService();

function onLogoutClick() {
    auth.logout();
    window.location.href = '/login';
}

function createChannelLinks(channels) {
    for (var i = 0; i < channels.length; i++) {
        var newli = document.createElement('li');
        newli.appendChild(document.createTextNode(channels[i].name));
        newli.setAttribute('id', channels[i].url);
        newli.addEventListener('click', function (event) {
            sbService.enterChannel(event.target.id, (resp, error) => {
                if (error) {
                    console.log(error);
                }
            });
        });
        document.getElementById('channelsList').appendChild(newli);
    }
}

class Users extends Component {
    componentDidMount() {
        events.on('connected', () => {
            sbService.getOpenChannels((channels) => {
                console.log(channels);
                createChannelLinks(channels);
                sbService.enterChannel(general_url, (resp, error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    events.emit('channel-open');
                });
            });
        });
    }

    render() {
        return (
            <div className="users-container">
                <div className="logout-button-container">
                    <button onClick={onLogoutClick}>Logout</button>
                </div>
                <div className="channels-container">
                    <ul id="channelsList">
                    </ul>
                </div>
            </div>
        )
    }
}

export default Users;