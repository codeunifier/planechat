import React, { Component } from 'react';
import SendBirdService from '../_services/SendBirdService';
import EventEmitterService from '../_services/EventEmitterService';
import Message from '../Message/Message';
import './Chat.css';

const sbService = new SendBirdService();
const events = new EventEmitterService();

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            messages: []
        };
    }

    componentDidMount() {
        sbService.connect(this.state.username, (user, error) => {
            if (error) { console.log(error); return; }

            console.log(user.userId + " connected");
            let newState = JSON.parse(JSON.stringify(this.state));
            newState.user = user;
            this.setState(newState);
        });

        events.on('channel-open', () => {
            sbService.getMessageHistory((list, error) => {
                if (error) { console.log(error); return; }

                //hide placeholder
                document.getElementById('chatPlaceholder').classList.toggle('hidden');

                //set messages to state
                let newState = JSON.parse(JSON.stringify(this.state));
                newState.messages = list;
                this.setState(newState);
            });
        });
    }

    componentWillUnmount() {
        //not sure when this is actually called, but just for good measure...
        sbService.disconnect(() => {
            console.log(this.state.user.userId + " disconnected");
        });
    }

    render() {
        let chatRows = this.state.messages.map((r, i) => {
            return <Message key={ r.messageId } data={r}/>;
        });

        return (
            <div className="chat-container">
                <div id="chatListContainer">
                    <div id="chatPlaceholder">
                        Loading chat history...
                    </div>
                    { chatRows }
                </div>
                <div className="chat-bottom-container">
                    <div className="chat-tags-list-container">
                        <div className="chat-tags-text">Tags:</div>
                        <div className="chat-tags-list"></div>
                    </div>
                    <div className="chat-input-container">
                        <div className="chat-input-content">
                            <input type="text" className="chat-input" placeholder="Press enter to send" autoComplete="off"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;