import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
// import Main from './Main/Main';
// import Chat from './Chat/Chat';
// import Users from './Users/Users';
// import Search from './Search/Search';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Main />, document.getElementById('app'));
// ReactDOM.render(<Chat />, document.getElementById('chat'));
// ReactDOM.render(<Users />, document.getElementById('users'));
// ReactDOM.render(<Search />, document.getElementById('search'));

registerServiceWorker();
