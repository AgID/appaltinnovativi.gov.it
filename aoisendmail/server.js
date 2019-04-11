'use strict';
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const bodyParser = require("body-parser");

var mailator = require('./mailator')

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.post('/sendSottomissionePEO', function (req, res) {
    mailator.sendSottomissionePEO(req)
        .then(function (data) {
            res.send(data)
        })
})

app.post('/sendAccettaAgid', function (req, res) {
    mailator.sendAccettaAgidPEO(req)
        .then(function (dataPEO) {
            if (dataPEO)
                return mailator.sendAccettaAgidPEC(req)
        })
        .then(function (data) {
            res.send(data)
        })
})

app.post('/sendRifiutaAgid', function (req, res) {
    mailator.sendRifiutaAgid(req)
        .then(function (data) {
            res.send(data)
        })
})

app.post('/sendAccettaPA', function (req, res) {
    mailator.sendAccettaPA(req)
        .then(function (data) {
            res.send(data)
        })
})

app.post('/sendRifiutaPA', function (req, res) {
    mailator.sendRifiutaPA(req)
        .then(function (data) {
            res.send(data)
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))