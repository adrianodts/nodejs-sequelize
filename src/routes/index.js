const express = require('express')
const pessoasRoute = require('./pessoasRoute')
const turmasRoute = require('./turmasRoute')
const niveisRoute = require('./niveisRoute')

module.exports = app => {
    app.use(
        express.json(), 
        express.urlencoded({ extended: true }),
        pessoasRoute,
        turmasRoute,
        niveisRoute)
}