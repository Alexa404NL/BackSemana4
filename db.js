const {Pool} = require('pg');
const dotenv = require ('dotenv');

dotenv.config();

const pool = new Pool ({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'bdpaises',
    port: process.env.DB_PORT || 5432,
    max: 10,
});


async function testConnect(){
    try{
        const client = await pool.connect();
        console.log("a pool connect was made lmao")
        client.release();
    } catch (error){
        console.error('Error al conectar a PostgreSQL:', error);
    }
}


module.exports =pool; 
testConnect();
