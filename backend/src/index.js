const express = require("express");
const dotenv = require('dotenv');
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get('/', (reg, res) => {
    res.send('Hello!')
})

app.listen(port, () => {
    console.log('server is running in port: ', + port)
})