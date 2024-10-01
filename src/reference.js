const express = require('express')
const referenceRouter = express.Router()
const { executeQueryToMSQL, fetchDataInBatches } = require("../libs")
const { v4: v4uuid } = require('uuid')

referenceRouter.get('/reference/policy-account', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from policy_account` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  
             [Account]
            ,[Description]
            ,[AccountCode]
            ,[COM]
            ,[TPL]
            ,[MAR]
            ,[FIRE]
            ,[G02]
            ,[G13]
            ,[G16]
            ,[MSPR]
            ,[PA]
            ,[CGL]
            ,[Inactive]
            FROM [Upward].[dbo].[Account]
            order by [Account]
            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`policy_account\`
                    (\`Account\`,
                    \`Description\`,
                    \`AccountCode\`,
                    \`COM\`,
                    \`TPL\`,
                    \`MAR\`,
                    \`FIRE\`,
                    \`G02\`,
                    \`G13\`,
                    \`G16\`,
                    \`MSPR\`,
                    \`PA\`,
                    \`CGL\`,
                    \`Inactive\`,
                    \`createdAt\`,
                    \`update\`)
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
                    now(),
                    now());

                    `,
                    parameters: [
                        row.Account,
                        row.Description,
                        row.AccountCode,
                        row.COM,
                        row.TPL,
                        row.MAR,
                        row.FIRE,
                        row.G02,
                        row.G13,
                        row.G16,
                        row.MSPR,
                        row.PA,
                        row.CGL,
                        row.Inactive,

                    ]
                })
            }
        })
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
referenceRouter.get('/reference/bank', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from bank` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT [Bank_Code]
                ,[Bank]
                ,[Inactive]
            FROM [Upward].[dbo].[Bank]
            order by [Bank_Code]

            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`bank\`
                    (\`Bank_Code\`,
                    \`Bank\`,
                    \`Inactive\`)
                    VALUES
                    ( 
                     ?,
                     ?,
                     ?);
                    `,
                    parameters: [
                        row.Bank_Code,
                        row.Bank,
                        row.Inactive,

                    ]
                })
            }
        })
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
referenceRouter.get('/reference/bank-account', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from bankaccounts ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  
                 [Account_No]
                ,[Account_Name]
                ,[Account_Type]
                ,[Desc]
                ,[Option]
                ,[Account ID] as Account_ID
                ,[Inactive]
                ,[Auto]
                ,[IDNo]
                ,[Identity]
            FROM [Upward].[dbo].[BankAccounts]
            ORDER BY [Account_No]
            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                   INSERT INTO \`bankaccounts\`
                    (\`Account_No\`,
                    \`Account_Name\`,
                    \`Account_Type\`,
                    \`Desc\`,
                    \`Option\`,
                    \`Account_ID\`,
                    \`Inactive\`,
                    \`Auto\`,
                    \`IDNo\`,
                    \`Identity\`)
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
                    ?);

                    `,
                    parameters: [
                        row.Account_No,
                        row.Account_Name,
                        row.Account_Type,
                        row.Desc,
                        row.Option,
                        row.Account_ID,
                        row.Inactive,
                        row.Auto,
                        row.IDNo,
                        row.Identity,
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/booklet', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from booklet ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT [Account]
                ,[DateEntry]
                ,[PolicyType]
                ,[PolicyBooklet]
                ,[PolicyNoFrom]
                ,[PolicyNoTo]
                ,[COCFrom]
                ,[COCTo]
                ,[ORFrom]
                ,[ORTo]
                ,[Done]
            FROM [Upward].[dbo].[Booklet]
            ORDER BY [Account]
            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                  INSERT INTO \`booklet\`
                    (\`Account\`,
                    \`DateEntry\`,
                    \`PolicyType\`,
                    \`PolicyBooklet\`,
                    \`PolicyNoFrom\`,
                    \`PolicyNoTo\`,
                    \`COCFrom\`,
                    \`COCTo\`,
                    \`ORFrom\`,
                    \`ORTo\`,
                    \`Done\`)
                    VALUES
                    ( ?,
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
                        row.Account,
                        row.DateEntry,
                        row.PolicyType,
                        row.PolicyBooklet,
                        row.PolicyNoFrom,
                        row.PolicyNoTo,
                        row.COCFrom,
                        row.COCTo,
                        row.ORFrom,
                        row.ORTo,
                        row.Done
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/books', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from books ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT [Code]
                ,[Number]
                ,[Book Code] as Book_Code
                ,[Books Desc] as Books_Desc
                ,[Hide Code] as Hide_Code
                ,[Default]
                ,[Hide]
            FROM [Upward].[dbo].[Books]
            ORDER BY [Code]
            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                  INSERT INTO \`books\`
                        (\`Code\`,
                        \`Number\`,
                        \`Book_Code\`,
                        \`Books_Desc\`,
                        \`Hide_Code\`,
                        \`Default\`,
                        \`Hide\`)
                        VALUES
                        ( ?,
                         ?,
                         ?,
                         ?,
                         ?,
                         ?,
                         ?);

                    `,
                    parameters: [
                        row.Code,
                        row.Number,
                        row.Book_Code,
                        row.Books_Desc,
                        row.Hide_Code,
                        row.Default,
                        row.Hide
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/chart-account', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from chart_account ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT  [Acct_Code]
                ,[Acct_Title]
                ,[Short]
                ,[Account]
                ,[Acct_Type]
                ,[IDNo]
                ,[SubAccnt]
                ,[Inactive]
            FROM [Upward].[dbo].[Chart Account]
            ORDER BY [Acct_Code]
            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                  INSERT INTO \`chart_account\`
                    (\`Acct_Code\`,
                    \`Acct_Title\`,
                    \`Short\`,
                    \`Account\`,
                    \`Acct_Type\`,
                    \`IDNo\`,
                    \`SubAccnt\`,
                    \`Inactive\`)
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
                        row.Acct_Code,
                        row.Acct_Title,
                        row.Short,
                        row.Account,
                        row.Acct_Type,
                        row.IDNo,
                        row.SubAccnt,
                        row.Inactive
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/mortgagee', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from mortgagee ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT [Policy]
                ,[Mortgagee]
            FROM [Upward].[dbo].[Mortgagee]
            ORDER BY [Mortgagee]
            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`mortgagee\`
                        (\`Policy\`,
                        \`Mortgagee\`,
                        \`createdAt\`,
                        \`update\`)
                    VALUES
                    (?,
                    ?,
                    now(),
                    now());

                    `,
                    parameters: [
                        row.Policy,
                        row.Mortgagee,
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/petty-log', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from petty_log ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
          SELECT [Purpose]
                ,[Acct_Code]
                ,[Short]
                ,[Inactive]
            FROM [Upward].[dbo].[Petty Log]
            ORDER BY [Purpose]
            `, cb: async (row) => {
                const Petty_Log = v4uuid()
                await executeQueryToMSQL({
                    query: `
                 INSERT INTO \`petty_log\`
                    (\`Petty_Log\`,
                    \`Purpose\`,
                    \`Acct_Code\`,
                    \`Short\`,
                    \`Inactive\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?);

                    `,
                    parameters: [
                        Petty_Log,
                        row.Purpose,
                        row.Acct_Code,
                        row.Short,
                        row.Inactive,

                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/rates', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from rates ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT [ID]
                    ,[Account]
                    ,[Line]
                    ,[Type]
                    ,[Rate]
            FROM [Upward].[dbo].[Rates]
            ORDER BY [ID]
            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                 INSERT INTO \`rates\`
                    (\`ID\`,
                    \`Account\`,
                    \`Line\`,
                    \`Type\`,
                    \`Rate\`,
                    \`createdAt\`,
                    \`update\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    ?,
                    now(),
                    now());
                    `,
                    parameters: [
                        row.ID,
                        row.Account,
                        row.Line,
                        row.Type,
                        row.Rate,
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/sub-account', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from sub_account ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  
                [Sub_Acct]
                ,[Description]
                ,[ShortName]
                ,[Inactive]
            FROM [Upward].[dbo].[SubAccount]
            ORDER BY [Sub_Acct]
            `, cb: async (row) => {
                const Sub_Acct = v4uuid()
                await executeQueryToMSQL({
                    query: `
                 INSERT INTO \`sub_account\`
                    (\`Sub_Acct\`,
                    \`Description\`,
                    \`ShortName\`,
                    \`Acronym\`,
                    \`createdAt\`,
                    \`update\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    ?,
                    now(),
                    now());
                    `,
                    parameters: [
                        Sub_Acct,
                        row.Description,
                        row.ShortName,
                        row.Sub_Acct,
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/subline', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from subline ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  
                    [ID]
                ,[Line]
                ,[SublineName]
            FROM [Upward].[dbo].[Subline]
            ORDER BY [ID]
            `, cb: async (row) => {
                const Sub_Acct = v4uuid()
                await executeQueryToMSQL({
                    query: `
                 INSERT INTO \`subline\`
                    (\`ID\`,
                    \`Line\`,
                    \`SublineName\`,
                    \`createdAt\`,
                    \`update\`)
                    VALUES
                    (?,
                    ?,
                    ?,
                    now(),
                    now());

                    `,
                    parameters: [
                        row.ID,
                        row.Line,
                        row.SublineName,
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/transaction-code', async (req, res) => {
    try {

        await executeQueryToMSQL({ query: 'delete from transaction_code ' })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
                SELECT  
                    [Code]
                    ,[Description]
                    ,[Acct_Code]
                    ,[Inactive]
                FROM [Upward].[dbo].[Transaction Code]
                order by [Code]
            `, cb: async (row) => {
                await executeQueryToMSQL({
                    query: `
                INSERT INTO \`transaction_code\`
                (\`Code\`,
                \`Description\`,
                \`Acct_Code\`,
                \`Inactive\`)
                VALUES
                (?,
                ?,
                ?,
                ?);

                    `,
                    parameters: [
                        row.Code,
                        row.Description,
                        row.Acct_Code,
                        row.Inactive,
                    ]
                })
            }
        })
        res.send({
            message: "",
            success: true,
        })
    } catch (err) {
        console.log(err)
        res.send({
            message: err.message,
            success: false,
        })
    }
})
referenceRouter.get('/reference/id-entry', async (req, res) => {

    try {
        await executeQueryToMSQL({ query: "delete from entry_agent" })
        await executeQueryToMSQL({ query: "delete from entry_employee" })
        await executeQueryToMSQL({ query: "delete from entry_fixed_assets" })
        await executeQueryToMSQL({ query: "delete from entry_supplier" })
        await executeQueryToMSQL({ query: "delete from entry_others" })
        await executeQueryToMSQL({ query: "delete from entry_client" })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
          select * from (
                SELECT 
                    CASE
                        WHEN IDType IN ('Clients', 'Companies') THEN 'C-0924-' + FORMAT(RowNum, '00000')
                        WHEN IDType = 'Fixed Assets' THEN 'FA-0924-' + FORMAT(RowNum, '00000')
                        WHEN IDType = 'Others' THEN 'O-0924-' + FORMAT(RowNum, '00000')
                        WHEN IDType = 'Employees' THEN 'E-0924-' + FORMAT(RowNum, '00000')
                        ELSE NULL
                    END AS newID,
                    CASE 
                        WHEN IDType = 'Companies' THEN 'Clients'
                        ELSE IDType
                    END AS newType,
                    *
                FROM 
                (
                    SELECT
                    *,
                        ROW_NUMBER() OVER (
                            PARTITION BY 
                                CASE 
                                    WHEN IDType IN ('Clients', 'Companies') THEN 'Clients_Companies'
                                    ELSE IDType 
                                END
                            ORDER BY IDNo) AS RowNum 
                    FROM
                        [Upward].[dbo].[ID Entry] where IDNo not in (SELECT IDNo FROM [Upward].[dbo].[ID Entry] WHERE [UnitNo] IS NOT NULL AND [Address] IS NOT NULL AND ([UnitNo] LIKE '%agent%' OR [Address] LIKE '%agent%')
						union all 
						SELECT IDNo FROM 
                        [Upward].[dbo].[ID Entry]
                    WHERE 
                         ([UnitNo] LIKE '%supplier%' OR [Address] LIKE '%supplier%' OR [Firstname] LIKE '%supplier%'
						) )
                ) as NumberedRows
                union all 
    
                SELECT 
                'A-0924-' + FORMAT(RowNum, '00000') AS newID ,
                'Agent' as newType,
                    *
                FROM 
                (
                    SELECT
                    *,
                        ROW_NUMBER() OVER (ORDER BY [IDNo]) AS RowNum 
                    FROM 
                        [Upward].[dbo].[ID Entry]
                    WHERE 
                        [UnitNo] IS NOT NULL 
                        AND [Address] IS NOT NULL 
                        AND ([UnitNo] LIKE '%agent%' OR [Address] LIKE '%agent%')
                ) as AgentRows
    
                union all 
                SELECT 
                'S-0924-' + FORMAT(RowNum, '00000') AS newID ,
                'Supplier' as newType,
                    *
                FROM 
                (
                    SELECT
                    *,
                        ROW_NUMBER() OVER (ORDER BY [IDNo]) AS RowNum 
                    FROM 
                        [Upward].[dbo].[ID Entry]
                    WHERE 
                        [Address] IS NOT NULL 
                        AND ([UnitNo] LIKE '%supplier%' OR [Address] LIKE '%supplier%' OR [Firstname] LIKE '%supplier%')
                ) as SupplierRows
                ) id_entry
                order by newID
            `, cb: async (row) => {
                if (row.newType === 'Agent') {
                    const contact_details_id = v4uuid()

                    const { data } = await executeQueryToMSQL({ query: `select Sub_Acct from sub_account where Acronym ='${row.Sub_Acct}'` })
                    const { Sub_Acct } = data[0]
                    await executeQueryToMSQL({
                        query: `
                        INSERT INTO \`contact_details\`
                        (\`contact_details_id\`,
                        \`email\`,
                        \`mobile\`,
                        \`telephone\`)
                        VALUES
                        ( ?,
                         ?,
                         ?,
                         ?);
                        `,
                        parameters: [
                            contact_details_id,
                            '',
                            row.Contact,
                            ''
                        ]
                    })

                    await executeQueryToMSQL({
                        query: `
                        INSERT INTO \`entry_agent\`
                            (\`entry_agent_id\`,
                            \`firstname\`,
                            \`lastname\`,
                            \`middlename\`,
                            \`address\`,
                            \`agent_contact_details_id\`,
                            \`createdAt\`,
                            \`update\`,
                            \`sub_account\`)
                            VALUES
                            (?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            now(),
                            now(),
                            ?);
                        `,
                        parameters: [
                            row.newID,
                            row.Firstname,
                            row.Lastname,
                            row.Middle,
                            row.Address,
                            contact_details_id,
                            Sub_Acct
                        ]
                    })
                } else if (row.newType === 'Employees') {
                    const { data } = await executeQueryToMSQL({ query: `select Sub_Acct from sub_account where Acronym ='${row.Sub_Acct}'` })
                    const { Sub_Acct } = data[0]

                    await executeQueryToMSQL({
                        query: `
                       INSERT INTO \`entry_employee\`
                        (\`entry_employee_id\`,
                        \`firstname\`,
                        \`middlename\`,
                        \`lastname\`,
                        \`sub_account\`,
                        \`address\`,
                        \`createdAt\`,
                        \`update\`)
                        VALUES
                        (?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        now(),
                        now());

                        `,
                        parameters: [
                            row.newID,
                            row.Firstname,
                            row.Middle,
                            row.Lastname,
                            Sub_Acct,
                            row.Address,
                        ]
                    })

                } else if (row.newType === 'Fixed Assets') {
                    const { data } = await executeQueryToMSQL({ query: `select Sub_Acct from sub_account where Acronym ='${row.Sub_Acct}'` })
                    const { Sub_Acct } = data[0]

                    await executeQueryToMSQL({
                        query: `
                       INSERT INTO \`entry_fixed_assets\`
                        (\`entry_fixed_assets_id\`,
                        \`description\`,
                        \`remarks\`,
                        \`fullname\`,
                        \`createdAt\`,
                        \`update\`,
                        \`sub_account\`)
                        VALUES
                        (?,
                        ?,
                        ?,
                        ?,
                        now(),
                        now(),
                        ?);

                        `,
                        parameters: [
                            row.newID,
                            '',
                            row.Address,
                            row.Shortname,
                            Sub_Acct,
                        ]
                    })
                } else if (row.newType === 'Supplier') {
                    const contact_details_id = v4uuid()

                    const { data } = await executeQueryToMSQL({ query: `select Sub_Acct from sub_account where Acronym ='${row.Sub_Acct}'` })
                    const { Sub_Acct } = data[0]
                    await executeQueryToMSQL({
                        query: `
                        INSERT INTO \`contact_details\`
                        (\`contact_details_id\`,
                        \`email\`,
                        \`mobile\`,
                        \`telephone\`)
                        VALUES
                        ( ?,
                         ?,
                         ?,
                         ?);
                        `,
                        parameters: [
                            contact_details_id,
                            '',
                            row.Contact,
                            ''
                        ]
                    })

                    await executeQueryToMSQL({
                        query: `
                        INSERT INTO \`entry_supplier\`
                            (\`entry_supplier_id\`,
                            \`supplier_contact_details_id\`,
                            \`firstname\`,
                            \`lastname\`,
                            \`middlename\`,
                            \`company\`,
                            \`address\`,
                            \`VAT_Type\`,
                            \`option\`,
                            \`tin_no\`,
                            \`createdAt\`,
                            \`update\`,
                            \`sub_account\`)
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
                            now(),
                            now(),
                            ?);

                        `,
                        parameters: [
                            row.newID,
                            contact_details_id,
                            row.Individual === 1 ?  row.Firstname : "",
                            row.Individual === 1 ? row.Lastname : "",
                            row.Individual === 1 ? row.Middle : "",
                            row.Individual === 1 ? "" : row.Shortname,
                            row.Address,
                            row.VatType,
                            row.Individual === 1 ? "individual" : "company",
                            row.TINNo,
                            Sub_Acct
                        ]
                    })
                } else if (row.newType === 'Others') {
                    const { data } = await executeQueryToMSQL({ query: `select Sub_Acct from sub_account where Acronym ='${row.Sub_Acct}'` })
                    const { Sub_Acct } = data[0]

                    await executeQueryToMSQL({
                        query: `
                       INSERT INTO \`entry_others\`
                        (\`entry_others_id\`,
                        \`description\`,
                        \`remarks\`,
                        \`createdAt\`,
                        \`update\`,
                        \`sub_account\`)
                        VALUES
                        (?,
                        ?,
                        ?,
                        now(),
                        now(),
                        ?);
                        `,
                        parameters: [
                            row.newID,
                            row.Shortname,
                            row.Address,
                            Sub_Acct,
                        ]
                    })
                } else {
                    const contact_details_id = v4uuid()

                    const { data } = await executeQueryToMSQL({ query: `select Sub_Acct from sub_account where Acronym ='${row.Sub_Acct}'` })
                    const { Sub_Acct } = data[0]
                    await executeQueryToMSQL({
                        query: `
                        INSERT INTO \`contact_details\`
                        (\`contact_details_id\`,
                        \`email\`,
                        \`mobile\`,
                        \`telephone\`)
                        VALUES
                        ( ?,
                         ?,
                         ?,
                         ?);
                        `,
                        parameters: [
                            contact_details_id,
                            '',
                            row.Contact,
                            ''
                        ]
                    })

                    await executeQueryToMSQL({
                        query: `
                        INSERT INTO \`entry_client\`
                        (\`entry_client_id\`,
                        \`sale_officer\`,
                        \`firstname\`,
                        \`lastname\`,
                        \`middlename\`,
                        \`company\`,
                        \`address\`,
                        \`option\`,
                        \`sub_account\`,
                        \`client_mortgagee\`,
                        \`client_branch\`,
                        \`chassis\`,
                        \`engine\`,
                        \`createdAt\`,
                        \`update\`,
                        \`client_contact_details_id\`)
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
                        now(),
                        now(),
                        ?);

                        `,
                        parameters: [
                            row.newID,
                            '',
                            row.Individual === 1 ?  row.Firstname : "",
                            row.Individual === 1 ? row.Lastname : "",
                            row.Individual === 1 ? row.Middle : "",
                            row.Individual === 1 ? "" : row.Shortname,
                            row.Address,
                            row.Individual === 1 ? "individual" : "company",
                            Sub_Acct,
                            '',
                            '',
                            '',
                            '',
                            contact_details_id
                            
                        ]
                    })
                }

            }
        })

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
    referenceRouter
}
