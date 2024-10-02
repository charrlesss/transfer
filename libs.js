const sql = require('msnodesqlv8')
const mysql = require('mysql2');

const stringConnectiong = 'server=DESKTOP-Q49OLSQ\\SQLEXPRESS;Database=Upward;Trusted_Connection=Yes;Driver={SQL Server}'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'charles',
    database: 'upward_test'
});
const executeQueryToSQLServer = async (query) => {
    return new Promise((resolve, reject) => {
        sql.query(stringConnectiong, query, (err, rows) => {
            if (err) {
                console.log(err)
                reject({
                    data: [],
                    message: err.message,
                    success: false
                })
            }

            resolve({
                data: rows,
                message: "Successfully Execute Query",
                success: true
            })
        })

    })
}
const executeQueryToMSQL = async ({query, parameters}) => {
    return new Promise((resolve, reject) => {
        if (parameters && parameters.length > 0) {
            return connection.query(query, parameters, (err, results) => {
                if (err) {
                    console.error(err);
                    reject({
                        data: [],
                        message: err.message,
                        success: false
                    })
                    return;
                }
                resolve({
                    data: results,
                    message: 'Successfully Execute Query',
                    success: true
                })
            });
        } else {
            return connection.query(query, (err, results) => {
                if (err) {
                    console.error(err);
                    reject({
                        data: [],
                        message: err.message,
                        success: false
                    })

                    return;
                }

                resolve({
                    data: results,
                    message: 'Successfully Execute Query',
                    success: true
                })
            });
        }
    })
}
async function fetchDataInBatches({ batchSize, query, cb }) {
    try {
        // Connect to the SQL Server database


        let totalRowsFetched = 0;
        let hasMoreRows = true;
        let currentBatch = 0;

        while (hasMoreRows) {
            // Calculate OFFSET based on the current batch
            let offset = currentBatch * batchSize;

            // SQL query with pagination
            const querys = `
                ${query}
                OFFSET ${offset} ROWS FETCH NEXT ${batchSize} ROWS ONLY;
            `;
            // Execute the query
            let { data } = await executeQueryToSQLServer(querys);

            // Get the rows from the result
            const rows = data;

            // Process the rows (You can modify this part to handle the data)
            for (const row of rows) {
                await cb(row)

            }
            // Check if we got less than the batch size, which indicates there are no more rows
            if (rows.length < batchSize) {
                hasMoreRows = false; // Stop the loop if fewer rows than batch size are returned
            }

            totalRowsFetched += rows.length;
            currentBatch++; // Move to the next batch
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    executeQueryToSQLServer,
    executeQueryToMSQL,
    fetchDataInBatches
}