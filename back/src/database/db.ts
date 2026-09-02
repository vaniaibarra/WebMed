import { Pool } from "pg";

if(!process.env.DB_URL){
    throw new Error('Falta variable DB_URL en archivo .env');
}

export const pool = new Pool({
    connectionString: process.env.DB_URL,
});

console.log('DB_URL en uso:', process.env.DB_URL);