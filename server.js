const express = require('express');
const path = require('path');

const app = express();
const port = process.env.port || 5000;

app.get('/api/hello', (req, res) => {
    res.send({ express: "Hello from my server!" });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log('Listening on port ' + port));