import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

export default class EventEmitterService {
    on(eventName, listener) {
        eventEmitter.on(eventName, listener);
    }

    addEventListener(eventName, listener) {
        eventEmitter.addListener(eventName, listener);
    }

    removeEventListener(eventName, listener) {
        eventEmitter.removeListener(eventName, listener);
    }

    emit(event, payload, error = false) {
        eventEmitter.emit(event, payload, error);
    }

    getEventEmitter() {
        return eventEmitter;
    }
}