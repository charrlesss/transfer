const express = require('express')

const { referenceRouter } = require('./src/reference')
const { productionRouter } = require('./src/production')
const { accountingRouter } = require('./src/accounting')
const { default: axios } = require('axios')


const app = express()
const PORT = 9999


app.use(referenceRouter)
app.use(productionRouter)
app.use(accountingRouter)
app.get('/set-up-database', async (req, res) => {
    try {
        console.log('setup reference....')
        await axios.get('http://localhost:9999/reference/set-up-reference')
        console.log('Done setup reference....')
        console.log('setup production....')
        await axios.get('http://localhost:9999/production/set-up-production')
        console.log('Done setup production....')
        console.log('setup accounting....')
        await axios.get('http://localhost:9999/accounting/set-up-accounting')
        console.log('Done setup accounting....')
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        res.send({
            message: err.message,
            success: false,
        })
    }
})


app.listen(PORT, () => console.log(`listen to port http://localhost:${PORT}`))

