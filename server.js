const express = require('express');
const path = require('path');

const app = express();

app.use('/ehr', express.static(path.join(__dirname, 'dist/keep-it-simple/browser')));

app.get(/^\/ehr\/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/keep-it-simple/browser/index.html'));
});

app.listen(2026, () => {
    console.log('Running on http://localhost:2026/ehr/');
});
