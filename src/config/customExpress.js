const express = require('express')
const app = express()
require('dotenv/config')

const {
    APP_URL,
    APP_PORT
} = process.env

module.exports = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.listen(APP_PORT, () => console.log(`Servidor rodando: ${APP_URL}:${APP_PORT}`))

    return app
}