const express = require('express')
const pessoasRoute = require('./pessoasRoute')

module.exports = app => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(pessoasRoute)
}