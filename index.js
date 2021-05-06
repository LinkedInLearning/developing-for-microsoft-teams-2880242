const express = require('express');

const server = express();
const port = process.env.port || process.env.PORT || 3978;
server.listen(port, () => 
    console.log(`Incoming webhook service listening at http://localhost:${port}`)
);

// Listen for incoming requests.
server.post('/api/outgoingwebhook', (req, res) => {
    var message = 'The current time is ' + (new Date()).toString();
    console.log(message);
    res.send("{ text: \"" + message + "\" }");
});
