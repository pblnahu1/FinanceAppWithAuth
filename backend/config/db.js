import pkg from "pg";
const { Pool } = pkg;

/// Para local
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "db_finance_app",
    password: "mysecretpassword",
    port: 5444,
});

/// Para Docker
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// })

pool.connect()
    .then(() => console.log("conectado a la base de datos db_finance_app"))
    .catch(err => console.error("error al conectar a la base de datos db_finance_app", err))

export const query = (text, params) => pool.query(text, params);
