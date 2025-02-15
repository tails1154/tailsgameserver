const express = require('express');
const app = express();
const path = require('path');  // Add this line
const fs = require('fs');
app.use(express.json()); // Middleware to parse JSON requests

const port = 5604; // Port to run the server


//Tailsgame server /hello api endpoint
app.get('/hello', (req, res) => {
    res.json({status: 'ok'});
});


app.get('/catalog', (req, res) => {
    delete require.cache[require.resolve('./catalog.json')];
    const catalog = require('./catalog.json');
    console.log(catalog);
    res.json(catalog);
});


app.get('/download', (req, res) => {
    const paramValue = req.query.game;
    const filePath = path.join(__dirname, paramValue);

    console.log('Requested file path:', filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    // Prevent caching
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Send the file
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error sending the file');
        }
    });
});


// Start server
app.listen(port, () => {
    console.log(`TailsGame API is running at http://localhost:${port}`);
});
