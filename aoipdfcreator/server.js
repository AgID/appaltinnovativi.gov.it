'use strict';
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
var bodyParser = require("body-parser");

var piddieffator = require('./piddieffator')

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/createPdfFromJson', function (req, res) {
    piddieffator.generatePdf(req.body)
        .then(function (response) {
            res.send(response)
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))