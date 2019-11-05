const mysql = require('mysql');
const {promisify} = require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code == 'PROTOCL_CONNECTION-LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION HAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('BD ESTA CONECTADO');
    return;
});

//promisify POOL QUERYS
pool.query = promisify(pool.query);
module.exports = pool;