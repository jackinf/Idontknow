const express = require('express');
const path = require('path');
const ip = require('ip');
const app = express();
const HOST = ip.address();
const PORT = 9000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);
console.log(`Open application at http://${HOST}:${PORT}`);