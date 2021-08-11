const express = require('express')
const routes = require('./routes')
const app = express()

require('dotenv/config')

const {
    APP_URL,
    APP_PORT
} = process.env

routes(app)

app.listen(APP_PORT, () => console.log(`Servidor rodando: ${APP_URL}:${APP_PORT}`))

module.exports = app