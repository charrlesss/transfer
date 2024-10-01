const express = require('express')

const {referenceRouter} = require('./src/reference')
const {productionRouter} = require('./src/production')


const app = express()
const PORT = 9999


app.use(referenceRouter)
app.use(productionRouter)


app.listen(PORT, () => console.log(`listen to port http://localhost:${PORT}`))

