const express = require('express')
const accountingRouter = express.Router()
const { executeQueryToMSQL, fetchDataInBatches } = require("../libs")


accountingRouter.get('/accounting/pdc', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from pdc` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT 
            RIGHT('000000' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR(5)), 5) AS PDC_ID,
            [Ref_No]
            ,[PNo]
            ,[IDNo]
            ,[Date]
            ,[Name]
            ,[Remarks]
            ,[Bank]
            ,[Branch]
            ,[Check_Date]
            ,[Check_No]
            ,[Check_Amnt]
            ,[Check_Remarks]
            ,[SlipCode]
            ,[DateDepo]
            ,[ORNum]
            ,[PDC Status] as PDC_Status
            ,[Date Stored] as Date_Stored
            ,[Date Endorsed] as Date_Endorsed
            ,[Date Pulled Out] as Date_Pulled_Out
            ,[PDC Remarks] as PDC_Remarks
            ,[mark]
           FROM [Upward].[dbo].[PDC] where Date >= '2020-01-01' 
            ORDER BY Ref_No
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                   INSERT INTO \`pdc\`
                    (\`PDC_ID\`,
                    \`Ref_No\`,
                    \`PNo\`,
                    \`IDNo\`,
                    \`Date\`,
                    \`Name\`,
                    \`Remarks\`,
                    \`Bank\`,
                    \`Branch\`,
                    \`Check_Date\`,
                    \`Check_No\`,
                    \`Check_Amnt\`,
                    \`Check_Remarks\`,
                    \`SlipCode\`,
                    \`DateDepo\`,
                    \`ORNum\`,
                    \`PDC_Status\`,
                    \`Date_Stored\`,
                    \`Date_Endorsed\`,
                    \`Date_Pulled_Out\`,
                    \`PDC_Remarks\`,
                    \`mark\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?);

                    `,
                    parameters: [
                        row.PDC_ID,
                        row.Ref_No,
                        row.PNo,
                        row.IDNo,
                        row.Date,
                        row.Name,
                        row.Remarks,
                        row.Bank,
                        row.Branch,
                        row.Check_Date,
                        row.Check_No,
                        row.Check_Amnt,
                        row.Check_Remarks,
                        row.SlipCode,
                        row.DateDepo,
                        row.ORNum,
                        row.PDC_Status,
                        row.Date_Stored,
                        row.Date_Endorsed,
                        row.Date_Pulled_Out,
                        row.PDC_Remarks,
                        row.mark,
                    ]
                })
            }
        })

        await executeQueryToMSQL({
            query: `update  upward_test.pdc a left join table1 b on a.IDNo = b.IDNo set a.IDNo = b.Firstname where b.Firstname is not null;
`})

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
accountingRouter.get('/accounting/collection', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from collection` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  
                    [Date]
                    ,[ORNo]
                    ,[IDNo]
                    ,[Name]
                    ,[Payment]
                    ,[Bank]
                    ,[Check_Date]
                    ,[Check_No]
                    ,[DRCode]
                    ,[DRTitle]
                    ,[DRRemarks]
                    ,[Debit]
                    ,[Purpose]
                    ,[CRCode]
                    ,[CRTitle]
                    ,[Credit]
                    ,[CRRemarks]
                    ,[ID_No]
                    ,[Official_Receipt]
                    ,[Temp_OR]
                    ,[Date_OR]
                    ,[Short]
                    ,[SlipCode]
                    ,[Status]
                    ,[CRLoanID]
                    ,[CRLoanName]
                    ,[CRRemarks2]
                    ,[CRVATType]
                    ,[CRInvoiceNo]
                FROM [Upward].[dbo].[Collection]  where Date >= '2020-01-01'
                ORDER BY [ORNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                  INSERT INTO \`collection\`
                    (\`Date\`,
                    \`ORNo\`,
                    \`IDNo\`,
                    \`Name\`,
                    \`Payment\`,
                    \`Bank\`,
                    \`Check_Date\`,
                    \`Check_No\`,
                    \`DRCode\`,
                    \`DRTitle\`,
                    \`DRRemarks\`,
                    \`Debit\`,
                    \`Purpose\`,
                    \`CRCode\`,
                    \`CRTitle\`,
                    \`Credit\`,
                    \`CRRemarks\`,
                    \`ID_No\`,
                    \`Official_Receipt\`,
                    \`Temp_OR\`,
                    \`Date_OR\`,
                    \`Short\`,
                    \`SlipCode\`,
                    \`Status\`,
                    \`CRLoanID\`,
                    \`CRLoanName\`,
                    \`CRRemarks2\`,
                    \`CRVATType\`,
                    \`CRInvoiceNo\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?);
                    `,
                    parameters: [
                        row.Date,
                        row.ORNo,
                        row.IDNo,
                        row.Name,
                        row.Payment,
                        row.Bank,
                        row.Check_Date,
                        row.Check_No,
                        row.DRCode,
                        row.DRTitle,
                        row.DRRemarks,
                        row.Debit,
                        row.Purpose,
                        row.CRCode,
                        row.CRTitle,
                        row.Credit,
                        row.CRRemarks,
                        row.ID_No,
                        row.Official_Receipt,
                        row.Temp_OR,
                        row.Date_OR,
                        row.Short,
                        row.SlipCode,
                        row.Status,
                        row.CRLoanID,
                        row.CRLoanName,
                        row.CRRemarks2,
                        row.CRVATType,
                        row.CRInvoiceNo,
                    ]
                })
            }
        })
        await executeQueryToMSQL({ query: ` update upward_test.collection a left join table1 b on a.CRLoanID = b.IDNo set a.CRLoanID = b.Firstname  where b.Firstname is not null ;    ` })
        await executeQueryToMSQL({ query: ` update upward_test.collection a left join table1 b on a.IDNo = b.IDNo set a.IDNo = b.Firstname  where b.Firstname is not null ;    ` })

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
accountingRouter.get('/accounting/deposit', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from deposit` })
        await executeQueryToMSQL({ query: `delete from deposit_slip` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  
                [Date_Deposit]
                ,[Slip_Code]
                ,[Account ID] as Account_ID
                ,[Account Name] as Account_Name
                ,[Debit]
                ,[Credit]
                ,[Check_Date]
                ,[Check_No]
                ,[Check_Ctr]
                ,[Check_Remarks]
                ,[Bank]
                ,[Type]
                ,[Ref_No]
                ,[IDNo]
                ,[Temp_SlipCode]
                ,[Temp_SlipCntr]
                ,[Temp_SlipDate]
                ,RIGHT('000000' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR(5)), 5) AS Deposit_ID
            FROM [Upward].[dbo].[Deposit] where Temp_SlipDate >= '2020-01-01'
            ORDER BY Deposit_ID
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                 INSERT INTO \`deposit\`
                    (\`Date_Deposit\`,
                    \`Slip_Code\`,
                    \`Account_ID\`,
                    \`Account_Name\`,
                    \`Debit\`,
                    \`Credit\`,
                    \`Check_Date\`,
                    \`Check_No\`,
                    \`Check_Ctr\`,
                    \`Check_Remarks\`,
                    \`Bank\`,
                    \`Type\`,
                    \`Ref_No\`,
                    \`IDNo\`,
                    \`Temp_SlipCode\`,
                    \`Temp_SlipCntr\`,
                    \`Temp_SlipDate\`,
                    \`Deposit_ID\`)
                    VALUES
                    (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                    );

                    `,
                    parameters: [
                        row.Date_Deposit,
                        row.Slip_Code,
                        row.Account_ID,
                        row.Account_Name,
                        row.Debit,
                        row.Credit,
                        row.Check_Date,
                        row.Check_No,
                        row.Check_Ctr,
                        row.Check_Remarks,
                        row.Bank,
                        row.Type,
                        row.Ref_No,
                        row.IDNo,
                        row.Temp_SlipCode,
                        row.Temp_SlipCntr,
                        row.Temp_SlipDate,
                        row.Deposit_ID
                    ]
                })
            }
        })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT  [Date]
                ,[SlipCode]
                ,[Slip]
                ,[BankAccount]
                ,[AccountName]
                ,[CheckDeposit]
                ,[CashDeposit]
                ,[IDNo]
            FROM [Upward].[dbo].[Deposit Slip]  where Date >= '2020-01-01'
            ORDER BY [SlipCode]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`deposit_slip\`
                    (\`Date\`,
                    \`SlipCode\`,
                    \`Slip\`,
                    \`BankAccount\`,
                    \`AccountName\`,
                    \`CheckDeposit\`,
                    \`CashDeposit\`,
                    \`IDNo\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?);

                    `,
                    parameters: [
                        row.Date,
                        row.SlipCode,
                        row.Slip,
                        row.BankAccount,
                        row.AccountName,
                        row.CheckDeposit,
                        row.CashDeposit,
                        row.IDNo,
                    ]
                })
            }
        })
        await executeQueryToMSQL({ query: ` update upward_test.deposit_slip a left join table1 b on a.IDNo = b.IDNo set  a.IDNo = b.Firstname  where b.Firstname is not null ;` })
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
accountingRouter.get('/accounting/returned-checks', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from return_checks` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT 
                 [Area]
                ,[RC_Date]
                ,[RC_No]
                ,[Explanation]
                ,[Check No] as Check_No
                ,[Date Deposit] as Date_Deposit
                ,[Date Collect] as Date_Collect
                ,[Amount]
                ,[Reason]
                ,[Bank]
                ,[Check Date] as Check_Date
                ,[Date Return] as Date_Return
                ,[SlipCode]
                ,[ORNum]
                ,[BankAccnt]
                ,[nSort]
                ,RIGHT('000000' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR(5)), 5) AS Temp_RCNo
            FROM [Upward].[dbo].[Return Checks] where RC_Date >= '2020-01-01'
            ORDER BY RC_No
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
              INSERT INTO \`return_checks\`
                    (\`Area\`,
                    \`RC_Date\`,
                    \`RC_No\`,
                    \`Explanation\`,
                    \`Check_No\`,
                    \`Date_Deposit\`,
                    \`Date_Collect\`,
                    \`Amount\`,
                    \`Reason\`,
                    \`Bank\`,
                    \`Check_Date\`,
                    \`Date_Return\`,
                    \`SlipCode\`,
                    \`ORNum\`,
                    \`BankAccnt\`,
                    \`nSort\`,
                    \`Temp_RCNo\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?);

                    `,
                    parameters: [
                        row.Area,
                        row.RC_Date,
                        row.RC_No,
                        row.Explanation,
                        row.Check_No,
                        row.Date_Deposit,
                        row.Date_Collect,
                        row.Amount,
                        row.Reason,
                        row.Bank,
                        row.Check_Date,
                        row.Date_Return,
                        row.SlipCode,
                        row.ORNum,
                        row.BankAccnt,
                        row.nSort,
                        row.Temp_RCNo
                    ]
                })
            }
        })

        await executeQueryToMSQL({ query: ` update upward_test.deposit_slip a left join table1 b on a.IDNo = b.IDNo set  a.IDNo = b.Firstname  where b.Firstname is not null ;` })
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
accountingRouter.get('/accounting/petty-cash', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from petty_cash` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
          SELECT  [Branch_Code]
                ,[PC_Date]
                ,[PC_No]
                ,[Explanation]
                ,[Payee]
                ,[DRPurpose]
                ,[DRAcct_Code]
                ,[DRShort]
                ,[Debit]
                ,[Sub_Acct]
                ,[IDNo]
                ,[ShortName]
                ,[CRAcct_Code]
                ,[CRShort]
                ,[Credit]
                ,[DRVATType]
                ,[DRInvoiceNo]
                ,RIGHT('000000' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR(5)), 5) AS VATItemNo
            FROM [Upward].[dbo].[Petty Cash] where PC_Date >= '2020-01-01'
            order by [PC_No]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                        INSERT INTO \`petty_cash\`
                    (\`Branch_Code\`,
                    \`PC_Date\`,
                    \`PC_No\`,
                    \`Explanation\`,
                    \`Payee\`,
                    \`DRPurpose\`,
                    \`DRAcct_Code\`,
                    \`DRShort\`,
                    \`Debit\`,
                    \`Sub_Acct\`,
                    \`IDNo\`,
                    \`ShortName\`,
                    \`CRAcct_Code\`,
                    \`CRShort\`,
                    \`Credit\`,
                    \`DRVATType\`,
                    \`DRInvoiceNo\`,
                    \`VATItemNo\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?);


                    `,
                    parameters: [
                        row.Branch_Code,
                        row.PC_Date,
                        row.PC_No,
                        row.Explanation,
                        row.Payee,
                        row.DRPurpose,
                        row.DRAcct_Code,
                        row.DRShort,
                        row.Debit,
                        row.Sub_Acct,
                        row.IDNo,
                        row.ShortName,
                        row.CRAcct_Code,
                        row.CRShort,
                        row.Credit,
                        row.DRVATType,
                        row.DRInvoiceNo,
                        row.VATItemNo,
                    ]
                })
            }
        })
        await executeQueryToMSQL({ query: ` update upward_test.petty_cash a left join table1 b on a.IDNo = b.IDNo set a.IDNo = b.Firstname   where b.Firstname is not null ;` })

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
accountingRouter.get('/accounting/general-journal', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from journal_voucher` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT [Branch_Code]
                    ,[Date_Entry]
                    ,[Source_Type]
                    ,[Source_No]
                    ,[Explanation]
                    ,[Particulars]
                    ,[Payto]
                    ,[Address]
                    ,[Check_Date]
                    ,[Check_No]
                    ,[Check_Bank]
                    ,[Check_Return]
                    ,[Check_Collect]
                    ,[Check_Deposit]
                    ,[Check_Reason]
                    ,[GL_Acct]
                    ,[Sub_Acct]
                    ,[ID_No]
                    ,[cGL_Acct]
                    ,[cSub_Acct]
                    ,[cID_No]
                    ,[Debit]
                    ,[Credit]
                    ,[TC]
                    ,[Remarks]
                    ,[AutoNo]
                    ,[VAT_Type]
                    ,[OR_Invoice_No]
                    ,[VATItemNo]
                FROM [Upward].[dbo].[Journal Voucher] where Date_Entry >= '2020-01-01'
                order by [Source_No]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                  INSERT INTO \`journal_voucher\`
                        (\`Branch_Code\`,
                        \`Date_Entry\`,
                        \`Source_Type\`,
                        \`Source_No\`,
                        \`Explanation\`,
                        \`Particulars\`,
                        \`Payto\`,
                        \`Address\`,
                        \`Check_Date\`,
                        \`Check_No\`,
                        \`Check_Bank\`,
                        \`Check_Return\`,
                        \`Check_Collect\`,
                        \`Check_Deposit\`,
                        \`Check_Reason\`,
                        \`GL_Acct\`,
                        \`Sub_Acct\`,
                        \`ID_No\`,
                        \`cGL_Acct\`,
                        \`cSub_Acct\`,
                        \`cID_No\`,
                        \`Debit\`,
                        \`Credit\`,
                        \`TC\`,
                        \`Remarks\`,
                        \`AutoNo\`,
                        \`VAT_Type\`,
                        \`OR_Invoice_No\`,
                        \`VATItemNo\`)
                        VALUES
                        (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?);

                    `,
                    parameters: [
                        row.Branch_Code,
                        row.Date_Entry,
                        row.Source_Type,
                        row.Source_No,
                        row.Explanation,
                        row.Particulars,
                        row.Payto,
                        row.Address,
                        row.Check_Date,
                        row.Check_No,
                        row.Check_Bank,
                        row.Check_Return,
                        row.Check_Collect,
                        row.Check_Deposit,
                        row.Check_Reason,
                        row.GL_Acct,
                        row.Sub_Acct,
                        row.ID_No,
                        row.cGL_Acct,
                        row.cSub_Acct,
                        row.cID_No,
                        row.Debit,
                        row.Credit,
                        row.TC,
                        row.Remarks,
                        row.AutoNo,
                        row.VAT_Type,
                        row.OR_Invoice_No,
                        row.VATItemNo,
                    ]
                })
            }
        })
        await executeQueryToMSQL({ query: `  update upward_test.journal_voucher a left join table1 b on a.ID_No = b.IDNo set a.ID_No = b.Firstname    where b.Firstname is not null ;` })

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
accountingRouter.get('/accounting/cash-disbursement', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from cash_disbursement` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT [Branch_Code]
                ,[Date_Entry]
                ,[Source_Type]
                ,[Source_No]
                ,[Explanation]
                ,[Particulars]
                ,[Payto]
                ,[Address]
                ,[Check_Date]
                ,[Check_No]
                ,[Check_Bank]
                ,[Check_Return]
                ,[Check_Collect]
                ,[Check_Deposit]
                ,[Check_Reason]
                ,[GL_Acct]
                ,[Sub_Acct]
                ,[ID_No]
                ,[cGL_Acct]
                ,[cSub_Acct]
                ,[cID_No]
                ,[Debit]
                ,[Credit]
                ,[TC]
                ,[Remarks]
                ,[AutoNo]
                ,[VAT_Type]
                ,[OR_Invoice_No]
                ,[VATItemNo]
            FROM [Upward].[dbo].[Cash Disbursement] where Date_Entry >= '2020-01-01'
            order by [Source_No]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                  INSERT INTO \`cash_disbursement\`
                        (\`Branch_Code\`,
                        \`Date_Entry\`,
                        \`Source_Type\`,
                        \`Source_No\`,
                        \`Explanation\`,
                        \`Particulars\`,
                        \`Payto\`,
                        \`Address\`,
                        \`Check_Date\`,
                        \`Check_No\`,
                        \`Check_Bank\`,
                        \`Check_Return\`,
                        \`Check_Collect\`,
                        \`Check_Deposit\`,
                        \`Check_Reason\`,
                        \`GL_Acct\`,
                        \`Sub_Acct\`,
                        \`ID_No\`,
                        \`cGL_Acct\`,
                        \`cSub_Acct\`,
                        \`cID_No\`,
                        \`Debit\`,
                        \`Credit\`,
                        \`TC\`,
                        \`Remarks\`,
                        \`AutoNo\`,
                        \`VAT_Type\`,
                        \`OR_Invoice_No\`,
                        \`VATItemNo\`)
                        VALUES
                        (?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?);
                    `,
                    parameters: [
                        row.Branch_Code,
                        row.Date_Entry,
                        row.Source_Type,
                        row.Source_No,
                        row.Explanation,
                        row.Particulars,
                        row.Payto,
                        row.Address,
                        row.Check_Date,
                        row.Check_No,
                        row.Check_Bank,
                        row.Check_Return,
                        row.Check_Collect,
                        row.Check_Deposit,
                        row.Check_Reason,
                        row.GL_Acct,
                        row.Sub_Acct,
                        row.ID_No,
                        row.cGL_Acct,
                        row.cSub_Acct,
                        row.cID_No,
                        row.Debit,
                        row.Credit,
                        row.TC,
                        row.Remarks,
                        row.AutoNo,
                        row.VAT_Type,
                        row.OR_Invoice_No,
                        row.VATItemNo,
                    ]
                })
            }
        })
        await executeQueryToMSQL({ query: ` update upward_test.cash_disbursement a left join table1 b on a.ID_No = b.IDNo set a.ID_No = b.Firstname    where b.Firstname is not null ; ` })

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
accountingRouter.get('/accounting/pullout', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from pullout_request` })
        await executeQueryToMSQL({ query: `delete from pullout_request_details` })
        await executeQueryToMSQL({ query: `delete from pullout_auth_codes` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  [RCPNo]
                ,[PNNo]
                ,[Reason]
                ,[Status]
                ,[Branch]
                ,[Requested_By]
                ,[Requested_Date]
                ,[Approved_By]
                ,[Approved_Date]
            FROM [Upward].[dbo].[Pullout_request]
            where Requested_Date >= '2020-01-01'
            order by RCPNo
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
              INSERT INTO \`pullout_request\`
                    (\`RCPNo\`,
                    \`PNNo\`,
                    \`Reason\`,
                    \`Status\`,
                    \`Branch\`,
                    \`Requested_By\`,
                    \`Requested_Date\`,
                    \`Approved_By\`,
                    \`Approved_Date\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?);

                    `,
                    parameters: [
                        row.RCPNo,
                        row.PNNo,
                        row.Reason,
                        row.Status,
                        row.Branch,
                        row.Requested_By,
                        row.Requested_Date,
                        row.Approved_By,
                        row.Approved_Date,
                    ]
                })
            }
        })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT 
                [Pullout_request_Details].RCPNo
                ,[CheckNo]
                ,RIGHT('000000' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR(5)), 5) AS PRD_ID
            FROM [Upward].[dbo].[Pullout_request_Details] left join [Upward].[dbo].[Pullout_request]
            on [Pullout_request_Details].RCPNo = [Pullout_request].RCPNo 
            where  [Pullout_request].Requested_Date >= '2020-01-01'
            order by RCPNo
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                        INSERT INTO \`pullout_request_details\`
                        (\`RCPNo\`,
                        \`CheckNo\`,
                        \`PRD_ID\`,
                        \`cancel\`)
                        VALUES
                        (?,
                        ?,
                        ?,
                        ?);


                    `,
                    parameters: [
                        row.RCPNo,
                        row.CheckNo,
                        row.PRD_ID,
                        0
                    ]
                })
            }
        })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT [RCPN]
                ,[For_User]
                ,[Approved_Code]
                ,[Disapproved_Code]
                ,[Used_By]
                ,[Used_DateTime]
                ,RIGHT('000000' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR(5)), 5) AS pullout_auth_codes_id
            FROM [Upward].[dbo].[Pullout_auth_codes] left join Pullout_request 
            on [Pullout_auth_codes].[RCPN] = Pullout_request.RCPNo
            where  [Pullout_request].Requested_Date >= '2020-01-01'
            order by [RCPN]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                       INSERT INTO \`pullout_auth_codes\`
                        (\`pullout_auth_codes_id\`,
                        \`RCPN\`,
                        \`For_User\`,
                        \`Approved_Code\`,
                        \`Disapproved_Code\`,
                        \`Used_By\`,
                        \`Used_DateTime\`)
                        VALUES
                        (?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?);

                    `,
                    parameters: [
                        row.pullout_auth_codes_id,
                        row.RCPN,
                        row.For_User,
                        row.Approved_Code,
                        row.Disapproved_Code,
                        row.Used_By,
                        row.Used_DateTime,
                    ]
                })
            }
        })
        await executeQueryToMSQL({ query: ` update upward_test.pullout_request a left join table1 b on a.PNNo = b.IDNo  set a.PNNo = b.Firstname  where b.Firstname is not null ;    ` })

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
accountingRouter.get('/accounting/postponement', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from postponement` })
        await executeQueryToMSQL({ query: `delete from postponement_detail` })
        await executeQueryToMSQL({ query: `delete from postponement_auth_codes` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT  [RPCDNo]
                ,[PNNo]
                ,[HoldingFees]
                ,[PenaltyCharge]
                ,[Surplus]
                ,[Deducted_to]
                ,[PaidVia]
                ,[PaidInfo]
                ,[Date]
                ,[Status]
                ,[Branch]
                ,[Prepared_by]
            FROM [Upward].[dbo].[Postponement] where Date >= '2020-01-01'
            order by RPCDNo
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                        INSERT INTO \`postponement\`
                            (\`RPCDNo\`,
                            \`PNNo\`,
                            \`HoldingFees\`,
                            \`PenaltyCharge\`,
                            \`Surplus\`,
                            \`Deducted_to\`,
                            \`PaidVia\`,
                            \`PaidInfo\`,
                            \`PaidDate\`,
                            \`Date\`,
                            \`Status\`,
                            \`Branch\`,
                            \`ClientBranch\`,
                            \`Prepared_by\`,
                            \`Requested_By\`,
                            \`Requested_Date\`,
                            \`Approved_By\`,
                            \`Approved_Date\`)
                            VALUES
                            (?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?);
                    `,
                    parameters: [
                        row.RPCDNo,
                        row.PNNo,
                        row.HoldingFees,
                        row.PenaltyCharge,
                        row.Surplus,
                        row.Deducted_to,
                        row.PaidVia,
                        row.PaidInfo,
                        null,
                        row.Date,
                        row.Status,
                        row.Branch,
                        '',
                        row.Prepared_by,
                        null,
                        null,
                        null,
                        null,
                    ]
                })
            }
        })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
          SELECT [RPCDNo] as RPCD
            ,[CheckNo]
            ,[OldCheckDate]
            ,[NewCheckDate]
            ,[Reason]
            ,RIGHT('000000' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR(5)), 5) AS RPCDNo

        FROM [Upward].[dbo].[Postponement_Detail]  where NewCheckDate >= '2020-01-01'
            order by RPCDNo
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                       INSERT INTO \`postponement_detail\`
                        (\`RPCD\`,
                        \`RPCDNo\`,
                        \`CheckNo\`,
                        \`OldCheckDate\`,
                        \`NewCheckDate\`,
                        \`Reason\`,
                        \`cancel\`)
                        VALUES
                        (?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?);

                    `,
                    parameters: [
                        row.RPCD,
                        row.RPCDNo,
                        row.CheckNo,
                        row.OldCheckDate,
                        row.NewCheckDate,
                        row.Reason,
                        0,
                    ]
                })
            }
        })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT [RPCD]
                ,[For_User]
                ,[Approved_Code]
                ,[Disapproved_Code]
                ,[Used_By]
                ,[Used_DateTime]
                ,RIGHT('000000' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR(5)), 5) AS postponement_auth_codes_id
            FROM [Upward].[dbo].[Postponement_Auth_Codes]

            left join [Upward].[dbo].[Postponement_Detail] on  [Postponement_Auth_Codes].RPCD = [Postponement_Detail].RPCDNo
            where [Postponement_Detail].NewCheckDate >= '2020-01-01'
            order by RPCD
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                      INSERT INTO \`postponement_auth_codes\`
                    (\`RPCD\`,
                    \`For_User\`,
                    \`Approved_Code\`,
                    \`Disapproved_Code\`,
                    \`Used_By\`,
                    \`Used_DateTime\`,
                    \`postponement_auth_codes_id\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?);
                    `,
                    parameters: [
                        row.RPCD,
                        row.For_User,
                        row.Approved_Code,
                        row.Disapproved_Code,
                        row.Used_By,
                        row.Used_DateTime,
                        row.postponement_auth_codes_id,
                    ]
                })
            }
        })

        await fetchDataInBatches({query:`update  upward_test.postponement a left join table1 b on a.PNNo = b.IDNo  set  a.PNNo = b.Firstname where b.Firstname is not null; `})
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
accountingRouter.get('/accounting/set-up-accounting', async (req, res) => {
    try {
        await axios.get('http://localhost:9999/accounting/pdc')
        await axios.get('http://localhost:9999/accounting/collection')
        await axios.get('http://localhost:9999/accounting/deposit')
        await axios.get('http://localhost:9999/accounting/returned-checks')
        await axios.get('http://localhost:9999/accounting/petty-cash')
        await axios.get('http://localhost:9999/accounting/cash-disbursement')
        await axios.get('http://localhost:9999/accounting/pullout')
        await axios.get('http://localhost:9999/accounting/postponement')

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

module.exports = {
    accountingRouter
}