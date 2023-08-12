import express from 'express';
import connection from './database/db.js';
const PORT = "8080";
const app = express();

app.listen(PORT, () => {
    console.log(`server is running at port 8080`)
    connection()
})