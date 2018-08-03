import React, { PureComponent } from 'react';

import './Message.css';

function formatSendDate(date) {
    var str = "Cannot determine time";
        var now = new Date();
    
        //TODO: this needs some serious reworking to fit every case - think about the ends/beginnings of months and years
        if (now.getDate() == date.getDate() ) {
            //today
            str = "Today at ";
        } else if (now.getDate() - 1 == date.getDate() && now.getMonth() == date.getMonth() && now.getFullYear() == date.getFullYear()) {
            //yesterday
            str = "Yesterday at ";
        } else {
            str = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " ";
        }
    
        var isAM;
    
        if (date.getHours() > 12) {
            isAM = false
            str += (date.getHours() - 12) + ":";
        } else {
            isAM = date.getHours() != 12;
            str += (date.getHours()) + ":";
        }
    
        if (date.getMinutes() < 10) {
            str += "0";
        }
    
        str += date.getMinutes() + " ";
    
        str += isAM ? "a.m." : "p.m.";
    
        return str;
}

export default class Message extends PureComponent {
    constructor(props) {
        super(props);

        console.log(props.data);
        this.state = {
            fromUser: props.data._sender.nickname === '' ? props.data._sender.userId : props.data._sender.nickname,
            message: props.data.message,
            sender: props.data._sender,
            sendDate: formatSendDate(new Date(props.data.createdAt))
        }
    }

    render() {
        return (
            <div className="message-container">
                <div className="user-image-container">
                    <img src={ this.state.sender.profileUrl }/>
                </div>
                <div className="message-content">
                    <div className="message-header">
                        <div className="message-from-user">
                            { this.state.fromUser }
                        </div>
                        <div className="message-send-date">
                            { this.state.sendDate }
                        </div>
                    </div>
                    <div className="message-tags-container"></div>
                    <div className="message-body">
                        { this.state.message }
                    </div>
                </div>
            </div>
        )
    }
}