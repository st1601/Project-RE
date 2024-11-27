const sql = require('mssql');

// Cấu hình database
const dbConfig = {
    user: 'SonU',
    password: 'Son160901@',
    server: '127.0.0.1',
    port: 1433,
    database: 'Final',
    options: {
        encrypt: false,           
        trustServerCertificate: true,
    }
};

// Kết nối database
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.error('Database Connection Failed: ', err));

module.exports = {sql, poolPromise };
