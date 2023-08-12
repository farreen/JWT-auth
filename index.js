import express from 'express';
import connection from './database/db.js';
import authRoutes from './routes/authRoutes.js';
const PORT = "8080";
const app = express();
app.use(express.json())

app.use(authRoutes)

app.listen(PORT, () => {
    console.log(`server is running at port 8080`)
    connection()
})