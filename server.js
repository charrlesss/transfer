const express = require('express')

const {referenceRouter} = require('./src/reference')
const {productionRouter} = require('./src/production')
const {accountingRouter} = require('./src/accounting')


const app = express()
const PORT = 9999


app.use(referenceRouter)
app.use(productionRouter)
app.use(accountingRouter)


app.listen(PORT, () => console.log(`listen to port http://localhost:${PORT}`))

