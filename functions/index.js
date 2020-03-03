const functions = require('firebase-functions');
const express = require('express')
const app = express()
const path = require('path')

exports.httpReq = functions.https.onRequest(app)

// middleware

app.use(express.urlencoded({extended: false}))
// public is logical name, takes to functions folder, then need to go to static to complete path
app.use('/public', express.static(path.join(__dirname, '/static')))

// set template engine

// both parameters are predefined constants:
app.set('view engine', 'ejs')
// location of ejs files:
app.set('views', './ejsviews')

// frontend programming

function frontendHandler(req, res) {
    res.sendFile(__dirname + '/prodadmin/prodadmin.html') // send a file to the client
}

app.get('/login', frontendHandler);
app.get('/home', frontendHandler);
app.get('/add', frontendHandler);
app.get('/show', frontendHandler);

// backend programming

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD9lccgaGUFunyHA_wdJhWoaDcPNMN7ENQ",
    authDomain: "williamb-wsp20.firebaseapp.com",
    databaseURL: "https://williamb-wsp20.firebaseio.com",
    projectId: "williamb-wsp20",
    storageBucket: "williamb-wsp20.appspot.com",
    messagingSenderId: "211542408687",
    appId: "1:211542408687:web:3fd56b2129c39e16410a1a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

app.get('/', (req, res) => {  // Arrow: fn def is given directly -- request and response object
    res.send('<h1>My Store (note: from backend processing)</h1>')
})

// test code

app.get('/testlogin', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/html/login.html'))
 })

 // req.body for post
app.post('/testsignIn', (req, res) => {
    const email = req.body.email
    const password = req.body.pass
    // let page = `
    //     (POST) You entered: ${email} and ${password}
    // `;
    // res.send(page)
    const obj = {
        a: email,
        b: password,
        c: '<h1>login success</h1>',
        d: '<h1>login success</h1>',
        start: 1,
        end: 10
    }
    res.render('home', obj) // render ejs file
})

// req.query only for get
app.get('/testsignIn', (req, res) => {
    const email = req.query.email
    const password = req.query.pass
    let page = `
        You entered: ${email} and ${password}
    `;
    res.send(page)
})

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