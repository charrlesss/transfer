const express = require('express')
const productionRouter = express.Router()
const { executeQueryToMSQL, fetchDataInBatches } = require("../libs")

productionRouter.get('/production/vpolicy', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from vpolicy` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT 
                [PolicyNo]
                ,[Account]
                ,[PolicyType]
                ,[CoverNo]
                ,[ORNo]
                ,[DateFrom]
                ,[DateTo]
                ,[Model]
                ,[Make]
                ,[BodyType]
                ,[Color]
                ,[BLTFileNo]
                ,[PlateNo]
                ,[ChassisNo]
                ,[MotorNo]
                ,[AuthorizedCap]
                ,[UnladenWeight]
                ,[TPL]
                ,[TPLLimit]
                ,[PremiumPaid]
                ,[EstimatedValue]
                ,[Aircon]
                ,[Stereo]
                ,[Magwheels]
                ,[Others]
                ,[OthersAmount]
                ,[Deductible]
                ,[Towing]
                ,[RepairLimit]
                ,[BodilyInjury]
                ,[PropertyDamage]
                ,[PersonalAccident]
                ,[SecI]
                ,[SecIIPercent]
                ,[ODamage]
                ,[Theft]
                ,[Sec4A]
                ,[Sec4B]
                ,[Sec4C]
                ,[AOG]
                ,[MortgageeForm]
                ,[Mortgagee]
                ,[Denomination]
            FROM [Upward].[dbo].[VPolicy] where DateFrom >= '2020-01-01'
            order by [PolicyNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`vpolicy\`
                        (\`PolicyNo\`,
                        \`Account\`,
                        \`PolicyType\`,
                        \`CoverNo\`,
                        \`ORNo\`,
                        \`DateFrom\`,
                        \`DateTo\`,
                        \`Model\`,
                        \`Make\`,
                        \`BodyType\`,
                        \`Color\`,
                        \`BLTFileNo\`,
                        \`PlateNo\`,
                        \`ChassisNo\`,
                        \`MotorNo\`,
                        \`AuthorizedCap\`,
                        \`UnladenWeight\`,
                        \`TPL\`,
                        \`TPLLimit\`,
                        \`PremiumPaid\`,
                        \`EstimatedValue\`,
                        \`Aircon\`,
                        \`Stereo\`,
                        \`Magwheels\`,
                        \`Others\`,
                        \`OthersAmount\`,
                        \`Deductible\`,
                        \`Towing\`,
                        \`RepairLimit\`,
                        \`BodilyInjury\`,
                        \`PropertyDamage\`,
                        \`PersonalAccident\`,
                        \`SecI\`,
                        \`SecIIPercent\`,
                        \`ODamage\`,
                        \`Theft\`,
                        \`Sec4A\`,
                        \`Sec4B\`,
                        \`Sec4C\`,
                        \`AOG\`,
                        \`MortgageeForm\`,
                        \`Mortgagee\`,
                        \`Denomination\`,
                        \`AOGPercent\`,
                        \`LocalGovTaxPercent\`,
                        \`TPLTypeSection_I_II\`,
                        \`Remarks\`)
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
                        row.PolicyNo,
                        row.Account,
                        row.PolicyType,
                        row.CoverNo,
                        row.ORNo,
                        row.DateFrom,
                        row.DateTo,
                        row.Model,
                        row.Make,
                        row.BodyType,
                        row.Color,
                        row.BLTFileNo,
                        row.PlateNo,
                        row.ChassisNo,
                        row.MotorNo,
                        row.AuthorizedCap,
                        row.UnladenWeight,
                        row.TPL,
                        row.TPLLimit,
                        row.PremiumPaid,
                        row.EstimatedValue,
                        row.Aircon,
                        row.Stereo,
                        row.Magwheels,
                        row.Others,
                        row.OthersAmount,
                        row.Deductible,
                        row.Towing,
                        row.RepairLimit,
                        row.BodilyInjury,
                        row.PropertyDamage,
                        row.PersonalAccident,
                        row.SecI,
                        row.SecIIPercent,
                        row.ODamage,
                        row.Theft,
                        row.Sec4A,
                        row.Sec4B,
                        row.Sec4C,
                        row.AOG,
                        row.MortgageeForm,
                        row.Mortgagee,
                        row.Denomination,
                        0.5,
                        0.75,
                        '',
                        ''
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
productionRouter.get('/production/cglpolicy', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from cglpolicy` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT  
                [PolicyNo]
                ,[Account]
                ,[PeriodFrom]
                ,[PeriodTo]
                ,[Location]
                ,[LimitA]
                ,[LimitB]
            FROM [Upward].[dbo].[CGLPolicy] where PeriodFrom >= '2020-01-01'
            order by [PolicyNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`cglpolicy\`
                    (\`PolicyNo\`,
                    \`Account\`,
                    \`address\`,
                    \`sumInsured\`,
                    \`PeriodFrom\`,
                    \`PeriodTo\`,
                    \`Location\`,
                    \`LimitA\`,
                    \`LimitB\`)
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
                        row.PolicyNo,
                        row.Account,
                        '',
                        0.00,
                        row.PeriodFrom,
                        row.PeriodTo,
                        row.Location,
                        row.LimitA,
                        row.LimitB,
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
productionRouter.get('/production/bpolicy', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from bpolicy` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
           SELECT [PolicyNo]
                ,[Account]
                ,[PolicyType]
                ,[Percentage]
                ,[BidDate]
                ,[BidTime]
                ,[Obligee]
                ,[UnitDetail]
                ,[BondValue]
                ,[NotaryName]
                ,[TaxCerNo]
                ,[IssuedLocation]
                ,[NIssued]
                ,[CapacityAs]
                ,[TaxCerNoCorp]
                ,[IssuedLoctCorp]
                ,[CIssued]
                ,[Officer]
                ,[OPosition]
                ,[Validity]
            FROM [Upward].[dbo].[BPolicy] where BidDate >= '2020-01-01'
            order by [PolicyNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`bpolicy\`
                        (\`PolicyNo\`,
                        \`Account\`,
                        \`PolicyType\`,
                        \`Percentage\`,
                        \`BidDate\`,
                        \`BidTime\`,
                        \`Obligee\`,
                        \`UnitDetail\`,
                        \`BondValue\`,
                        \`NotaryName\`,
                        \`TaxCerNo\`,
                        \`IssuedLocation\`,
                        \`NIssued\`,
                        \`CapacityAs\`,
                        \`TaxCerNoCorp\`,
                        \`IssuedLoctCorp\`,
                        \`CIssued\`,
                        \`Officer\`,
                        \`OPosition\`,
                        \`Validity\`)
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
                        ?);

                    `,
                    parameters: [
                        row.PolicyNo,
                        row.Account,
                        row.PolicyType,
                        row.Percentage,
                        row.BidDate,
                        row.BidTime,
                        row.Obligee,
                        row.UnitDetail,
                        row.BondValue,
                        row.NotaryName,
                        row.TaxCerNo,
                        row.IssuedLocation,
                        row.NIssued,
                        row.CapacityAs,
                        row.TaxCerNoCorp,
                        row.IssuedLoctCorp,
                        row.CIssued,
                        row.Officer,
                        row.OPosition,
                        row.Validity,
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
productionRouter.get('/production/fpolicy', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from fpolicy` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
          SELECT  [PolicyNo]
                ,[Account]
                ,[DateFrom]
                ,[DateTo]
                ,[BillNo]
                ,[Percentage]
                ,[Location]
                ,[InsuredValue]
                ,[PropertyInsured]
                ,[Constraction]
                ,[Occupancy]
                ,[Boundaries]
                ,[Mortgage]
                ,[Warranties]
            FROM [Upward].[dbo].[FPolicy] where DateFrom >= '2020-01-01'
            order by [PolicyNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`fpolicy\`
                        (\`PolicyNo\`,
                        \`Account\`,
                        \`DateFrom\`,
                        \`DateTo\`,
                        \`BillNo\`,
                        \`Percentage\`,
                        \`Location\`,
                        \`InsuredValue\`,
                        \`PropertyInsured\`,
                        \`Constraction\`,
                        \`Occupancy\`,
                        \`Boundaries\`,
                        \`Mortgage\`,
                        \`Warranties\`)
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
                        ?);

                    `,
                    parameters: [
                        row.PolicyNo,
                        row.Account,
                        row.DateFrom,
                        row.DateTo,
                        row.BillNo,
                        row.Percentage,
                        row.Location,
                        row.InsuredValue,
                        row.PropertyInsured,
                        row.Constraction,
                        row.Occupancy,
                        row.Boundaries,
                        row.Mortgage,
                        row.Warranties,
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
productionRouter.get('/production/mpolicy', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from mpolicy` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
        SELECT [PolicyNo]
                ,[Account]
                ,[Location]
                ,[DateFrom]
                ,[DateTo]
                ,[PointOfOrigin]
                ,[PointofDestination]
                ,[Vessel]
                ,[AdditionalInfo]
                ,[SubjectInsured]
                ,[Consignee]
                ,[InsuredValue]
                ,[Percentage]
            FROM [Upward].[dbo].[MPolicy] where DateFrom >= '2020-01-01'
            order by [PolicyNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                  INSERT INTO \`mpolicy\`
                            (\`PolicyNo\`,
                            \`Account\`,
                            \`Location\`,
                            \`DateFrom\`,
                            \`DateTo\`,
                            \`PointOfOrigin\`,
                            \`PointofDestination\`,
                            \`Vessel\`,
                            \`AdditionalInfo\`,
                            \`SubjectInsured\`,
                            \`Consignee\`,
                            \`InsuredValue\`,
                            \`Percentage\`)
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
                            ?);


                    `,
                    parameters: [
                        row.PolicyNo,
                        row.Account,
                        row.Location,
                        row.DateFrom,
                        row.DateTo,
                        row.PointOfOrigin,
                        row.PointofDestination,
                        row.Vessel,
                        row.AdditionalInfo,
                        row.SubjectInsured,
                        row.Consignee,
                        row.InsuredValue,
                        row.Percentage,
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
productionRouter.get('/production/msprpolicy', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from msprpolicy` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  [PolicyNo]
                    ,[Account]
                    ,[PeriodFrom]
                    ,[PeriodTo]
                    ,[Location]
                    ,[Saferoom]
                    ,[OriginPoint]
                    ,[DestinationPoint]
                    ,[Method]
                    ,[Guard]
                    ,[Messenger]
                    ,[SecI]
                    ,[SecIPremium]
                    ,[SecIB]
                    ,[SecIPremiumB]
                    ,[SecII]
                    ,[SecIIPremium]
                FROM [Upward].[dbo].[MSPRPolicy] where PeriodFrom >= '2020-01-01' 
                order by [PolicyNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`msprpolicy\`
                        (\`PolicyNo\`,
                        \`Account\`,
                        \`PeriodFrom\`,
                        \`PeriodTo\`,
                        \`Location\`,
                        \`Saferoom\`,
                        \`OriginPoint\`,
                        \`DestinationPoint\`,
                        \`Method\`,
                        \`Guard\`,
                        \`Messenger\`,
                        \`SecI\`,
                        \`SecIPremium\`,
                        \`SecIB\`,
                        \`SecIPremiumB\`,
                        \`SecII\`,
                        \`SecIIPremium\`)
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
                        ?);
                    `,
                    parameters: [
                        row.PolicyNo,
                        row.Account,
                        row.PeriodFrom,
                        row.PeriodTo,
                        row.Location,
                        row.Saferoom,
                        row.OriginPoint,
                        row.DestinationPoint,
                        row.Method,
                        row.Guard,
                        row.Messenger,
                        row.SecI,
                        row.SecIPremium,
                        row.SecIB,
                        row.SecIPremiumB,
                        row.SecII,
                        row.SecIIPremium,
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
productionRouter.get('/production/papolicy', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from papolicy` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT  [PolicyNo]
                    ,[Account]
                    ,[PeriodFrom]
                    ,[PeriodTo]
                    ,[Location]
                FROM [Upward].[dbo].[PAPolicy] where PeriodFrom >= '2020-01-01'
                order by [PolicyNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                   INSERT INTO \`papolicy\`
                        (\`PolicyNo\`,
                        \`Account\`,
                        \`sumInsured\`,
                        \`PeriodFrom\`,
                        \`PeriodTo\`,
                        \`Location\`)
                        VALUES
                        (?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?);

                    `,
                    parameters: [
                        row.PolicyNo,
                        row.Account,
                        0.00,
                        row.PeriodFrom,
                        row.PeriodTo,
                        row.Location,
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
productionRouter.get('/production/policy', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from policy` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
            SELECT [IDNo]
                    ,[Account]
                    ,[SubAcct]
                    ,[PolicyType]
                    ,[PolicyNo]
                    ,[DateIssued]
                    ,[TotalPremium]
                    ,[Vat]
                    ,[DocStamp]
                    ,[FireTax]
                    ,[LGovTax]
                    ,[Notarial]
                    ,[Misc]
                    ,[TotalDue]
                    ,[ExtraDebit]
                    ,[ExtraCredit]
                    ,[Payment1]
                    ,[Payment2]
                    ,[Payment3]
                    ,[TotalPaid]
                    ,[Discount]
                    ,[Journal]
                    ,[Cancelled]
                    ,[Remarks]
                    ,[AgentID]
                    ,[AgentCom]
                    ,[Remitted]
                FROM [Upward].[dbo].[Policy] where DateIssued >= '2020-01-01'
            order by [IDNo]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                    INSERT INTO \`policy\`
                    (\`IDNo\`,
                    \`Account\`,
                    \`SubAcct\`,
                    \`PolicyType\`,
                    \`PolicyNo\`,
                    \`DateIssued\`,
                    \`TotalPremium\`,
                    \`Vat\`,
                    \`DocStamp\`,
                    \`FireTax\`,
                    \`LGovTax\`,
                    \`Notarial\`,
                    \`Misc\`,
                    \`TotalDue\`,
                    \`ExtraDebit\`,
                    \`ExtraCredit\`,
                    \`Payment1\`,
                    \`Payment2\`,
                    \`Payment3\`,
                    \`TotalPaid\`,
                    \`Discount\`,
                    \`Journal\`,
                    \`Cancelled\`,
                    \`Remarks\`,
                    \`AgentID\`,
                    \`AgentCom\`,
                    \`Remitted\`)
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
                    ?
                    );

                    `,
                    parameters: [
                        row.IDNo,
                        row.Account,
                        row.SubAcct,
                        row.PolicyType,
                        row.PolicyNo,
                        row.DateIssued,
                        row.TotalPremium,
                        row.Vat,
                        row.DocStamp,
                        row.FireTax,
                        row.LGovTax,
                        row.Notarial,
                        row.Misc,
                        row.TotalDue,
                        row.ExtraDebit,
                        row.ExtraCredit,
                        row.Payment1,
                        row.Payment2,
                        row.Payment3,
                        row.TotalPaid,
                        row.Discount,
                        row.Journal,
                        row.Cancelled,
                        row.Remarks,
                        row.AgentID,
                        row.AgentCom,
                        row.Remitted,
                    ]
                })
            }
        })
        await executeQueryToMSQL({ query: `update upward_test.policy a left join table1 b on a.IDNo = b.IDNo set a.IDNo = b.Firstname where b.Firstname is not null; ` })
        await executeQueryToMSQL({ query: `update upward_test.policy a left join table1 b on a.AgentID = b.IDNo set a.IDNo = b.Firstname where b.Firstname is not null;` })

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
productionRouter.get('/production/journal', async (req, res) => {
    try {
        await executeQueryToMSQL({ query: `delete from journal` })
        await fetchDataInBatches({
            batchSize: 1000,
            query: `
          SELECT  
                 [Branch_Code]
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
            FROM [Upward].[dbo].[Journal] where Date_Entry >= '2020-01-01'
                order by [Source_No]
            `, cb: async (row) => {

                await executeQueryToMSQL({
                    query: `
                   INSERT INTO \`journal\`
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
                    \`VATItemNo\`,
                    \`Source_No_Ref_ID\`)
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
                        ''
                    ]
                })
            }
        })

        await executeQueryToMSQL({query:`update upward_test.journal a left join table1 b on a.ID_No = b.IDNo set a.ID_No = b.Firstname where b.Firstname is not null ;`})
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
productionRouter.get('/production/set-up-production', async (req, res) => {
    try {
        await axios.get('http://localhost:9999/production/vpolicy')
        await axios.get('http://localhost:9999/production/cglpolicy')
        await axios.get('http://localhost:9999/production/bpolicy')
        await axios.get('http://localhost:9999/production/fpolicy')
        await axios.get('http://localhost:9999/production/mpolicy')
        await axios.get('http://localhost:9999/production/msprpolicy')
        await axios.get('http://localhost:9999/production/papolicy')
        await axios.get('http://localhost:9999/production/policy')
        await axios.get('http://localhost:9999/production/journal')

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
    productionRouter
}

