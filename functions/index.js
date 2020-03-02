const functions = require('firebase-functions');
const express = require('express')
const app = express()

exports.httpReq = functions.https.onRequest(app)

// frontend programming:

function frontendHandler(req, res) {
    res.sendFile(__dirname + '/prodadmin/prodadmin.html')
}

app.get('/login', frontendHandler);
app.get('/home', frontendHandler);
app.get('/add', frontendHandler);
app.get('/show', frontendHandler);

// backend programming:

app.get('/', (req, res) => {  // Arrow: fn def is given directly -- request and response object
    res.send('<h1>My Store (note: from backend processing)</h1>')
})

// test code

app.get('/test', (req, res) => {
    const time = new Date().toString() // server's time is read
    let page = `
        <h1>Current Time At Server: ${time}</h1>
    `;
    res.header('refresh', 1)
    res.send(page)
})

app.get('/test2', (req, res) => {
    res.redirect('http://www.uco.edu')
})