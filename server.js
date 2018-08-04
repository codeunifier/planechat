const express = require('express');
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 5000;

//routers
const apiRouter = require('./srv/routes/api.js');

//TODO: add TLS
app.use(session({
    secret: "planechat",
    cookie: {
        httpOnly: true,
        maxAge: 60000,
        name: "sessionId",
        secure: true
    },
    resave: true,
    saveUninitialized: true
}));
app.use(helmet());

//Routers
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.get('/login/authorization', (req, res, next) => {
    if (req.query.error) {
        res.send(req.query.error + ": " + req.query.error_description);
    } else {
        res.redirect(process.env.NODE_ENV === "production" ? ('https://planechat.herokuapp.com/auth') : ('http://localhost:3000/auth'));
    }
});

app.listen(port, () => console.log('Listening on port ' + port));