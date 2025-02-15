const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

const port = 5604; // Port to run the server


//Tailsgame server /hello api endpoint
app.get('/hello', (req, res) => {
    res.json({status: 'ok'});
});

// Start server
app.listen(port, () => {
    console.log(`TailsGame API is running at http://localhost:${port}`);
});
