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

app.get('/setup-id-sequence', async (req, res) => {
    try {
        //pdc
        const { data: Ref_No } = await executeQueryToMSQL({ query: 'SELECT Ref_No FROM pdc order by Ref_No desc limit 1;' })
        const { data: PDC_ID } = await executeQueryToMSQL({ query: 'SELECT PDC_ID FROM pdc order by PDC_ID desc limit 1;' })

        await executeQueryToMSQL({ query: `update id_sequence set last_count='${Ref_No[0].Ref_No.split('.')[1]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'pdc'` })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${PDC_ID[0].PDC_ID}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'pdc-chk'` })

        //collection
        const { data: collection } = await executeQueryToMSQL({ query: 'SELECT ORNo FROM collection order by ORNo desc limit 1' })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${collection[0].ORNo}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'collection'` })

        // deposit
        const { data: deposit } = await executeQueryToMSQL({ query: 'SELECT Slip_Code FROM deposit where Slip_Code is not null order by  Slip_Code desc limit 1' })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${deposit[0].Slip_Code.split('-')[1]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'deposit'` })

        // return checks
        const { data: return_checks } = await executeQueryToMSQL({ query: 'SELECT RC_No FROM return_checks order by RC_No desc limit 1' })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${return_checks[0].RC_No.split('-')[1]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'return-check'` })

        // petty cash
        const { data: petty_cash } = await executeQueryToMSQL({ query: 'SELECT PC_No FROM petty_cash order by PC_No desc limit 1;' })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${petty_cash[0].PC_No.split('-')[1]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'petty-cash'` })

        // general journal
        const { data: general_journal } = await executeQueryToMSQL({ query: 'SELECT Source_No FROM journal_voucher order by Source_No desc limit 1;' })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${general_journal[0].Source_No.split('-')[1]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'general-journal'` })

        // cash disbursement
        const { data: cash_disbursement } = await executeQueryToMSQL({ query: 'SELECT Source_No FROM cash_disbursement order by Source_No desc limit 1;' })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${cash_disbursement[0].Source_No.split('-')[1]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'cash-disbursement'` })

        // pullout
        await executeQueryToMSQL({ query: `update id_sequence set last_count='0000', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'pullout'` })

        // postponement
        await executeQueryToMSQL({ query: `update id_sequence set last_count='0000', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'check-postponement'` })

        // entry client
        const { data: entry_client } = await executeQueryToMSQL({ query: `SELECT entry_client_id FROM entry_client order by entry_client_id desc limit 1; ` })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${entry_client[0].entry_client_id.split('-')[2]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'entry client'` })

        // entry employee
        const { data: entry_employee } = await executeQueryToMSQL({ query: `SELECT entry_employee_id FROM entry_employee order by entry_employee_id desc limit 1; ` })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${entry_employee[0].entry_employee_id.split('-')[2]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'entry employee'` })

        // entry agent
        const { data: entry_agent } = await executeQueryToMSQL({ query: `SELECT entry_agent_id FROM entry_agent order by entry_agent_id desc limit 1; ` })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${entry_agent[0].entry_agent_id.split('-')[2]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'entry agent'` })

        // entry fixed assets
        const { data: entry_fixed_assets } = await executeQueryToMSQL({ query: `SELECT entry_fixed_assets_id FROM entry_fixed_assets order by entry_fixed_assets_id desc limit 1; ` })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${entry_fixed_assets[0].entry_fixed_assets_id.split('-')[2]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'entry fixed assets'` })

        // entry others
        const { data: entry_others } = await executeQueryToMSQL({ query: `SELECT entry_others_id FROM entry_others order by entry_others_id desc limit 1; ` })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${entry_others[0].entry_others_id.split('-')[2]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'entry others'` })

        // entry supplier
        const { data: entry_supplier } = await executeQueryToMSQL({ query: `SELECT entry_supplier_id FROM entry_supplier order by entry_supplier_id desc limit 1; ` })
        await executeQueryToMSQL({ query: `update id_sequence set last_count='${entry_supplier[0].entry_supplier_id.split('-')[2]}', year = DATE_FORMAT(now(), '%y'), month=DATE_FORMAT(now(), '%m') where type = 'entry supplier'` })

        res.send({
            message: "",
            success: true,
            collection
        })
    } catch (err) {
        res.send({
            message: err.message,
            success: false,
        })
    }
})


app.get('/set-up-database',async(req,res)=>{
    try {
        console.log('reference...')
        await axios.get('http://localhost:9999/reference/policy-account')
        await axios.get('http://localhost:9999/reference/bank')
        await axios.get('http://localhost:9999/reference/bank-account')
        await axios.get('http://localhost:9999/reference/booklet')
        await axios.get('http://localhost:9999/reference/books')
        await axios.get('http://localhost:9999/reference/chart-account')
        await axios.get('http://localhost:9999/reference/mortgagee')
        await axios.get('http://localhost:9999/reference/petty-log')
        await axios.get('http://localhost:9999/reference/rates')
        await axios.get('http://localhost:9999/reference/sub-account')
        await axios.get('http://localhost:9999/reference/subline')
        await axios.get('http://localhost:9999/reference/transaction-code')
        await axios.get('http://localhost:9999/reference/ctplp-registration')
        await axios.get('http://localhost:9999/reference/id-entry')

        console.log('production...')
        await axios.get('http://localhost:9999/production/vpolicy')
        await axios.get('http://localhost:9999/production/cglpolicy')
        await axios.get('http://localhost:9999/production/bpolicy')
        await axios.get('http://localhost:9999/production/fpolicy')
        await axios.get('http://localhost:9999/production/mpolicy')
        await axios.get('http://localhost:9999/production/msprpolicy')
        await axios.get('http://localhost:9999/production/papolicy')
        await axios.get('http://localhost:9999/production/policy')
        await axios.get('http://localhost:9999/production/journal')
        console.log('accounting...')

        await axios.get('http://localhost:9999/accounting/pdc')
        await axios.get('http://localhost:9999/accounting/collection')
        await axios.get('http://localhost:9999/accounting/deposit')
        await axios.get('http://localhost:9999/accounting/returned-checks')
        await axios.get('http://localhost:9999/accounting/petty-cash')
        await axios.get('http://localhost:9999/accounting/cash-disbursement')
        await axios.get('http://localhost:9999/accounting/pullout')
        await axios.get('http://localhost:9999/accounting/postponement')

        console.log('setup-id-sequence...')
        await axios.get('http://localhost:9999/setup-id-sequence')

        res.send({
            message: "",
            success: true,
        })
    } catch (error) {
        res.send({
            message: err.message,
            success: false,
        })
    }
})


app.listen(PORT, () => console.log(`listen to port http://localhost:${PORT}`))

