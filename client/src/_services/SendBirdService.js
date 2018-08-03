import * as SendBird from 'sendbird';
import EventEmitterService from '../_services/EventEmitterService';

const sb = new SendBird({'appId': process.env.REACT_APP_SENDBIRD_APP_ID});
const events = new EventEmitterService();
let _currentChannel = null;

export default class SendBirdService {
    connected = false;

    isConnected() {
        return this.connected;
    }

    connect(username, callback) {
        sb.connect(username, (user, error) => {
            this.connected = true;
            events.emit('connected');
            if (callback) {
                callback(user, error);
            }
        });
    }

    disconnect(callback) {
        sb.disconnect(() => {
            this.connected = false;
            events.emit('disconnected');
            if (callback) {
                callback();
            }
        });
    }

    displayChannels() {
        sb.OpenChannel.createOpenChannelListQuery().next((channels, error) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(channels);
        });
    }

    getOpenChannels(callback) {
        sb.OpenChannel.createOpenChannelListQuery().next((channels, error) => {
            if (error) {
                console.log(error);
                return;
            }

            if (callback) {
                callback(channels);
            }
        });
    }

    enterChannel(url, callback) {
        sb.OpenChannel.getChannel(url, (channel, error) => {
            if (error) { console.log(error); if (callback) { callback(null, error) } };

            channel.enter((response, error) => {
                _currentChannel = channel;

                if (callback) {
                    callback(response, error);
                }
            });
        });
    }

    sendMessage(message) {
        if (_currentChannel) {
            _currentChannel.sendUserMessage(message, null, null, (message, error) => {
                if (error) { console.log(error);  return; }

                console.log(message);
            });
        }
    }

    getMessageHistory(callback) {
        if (_currentChannel) {
            _currentChannel.createPreviousMessageListQuery().load(50, true, (list, error) => {
                callback(list, error);
            });
        }
    }
}