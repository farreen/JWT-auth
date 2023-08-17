import express from 'express';
import connection from './database/db.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoute from './routes/dashboardRoute.js'
import cookieParser from 'cookie-parser';
const PORT = "8080";
const app = express();
app.use(express.json())
app.use(cookieParser());

app.use(authRoutes, dashboardRoute)
// app.use(dashboardRoute)

// COOKIE
// app.get("/set-cookies", (req, res) => {
//     res.cookie("newCookie", false);
//     res.cookie("isEmployee", true, {maxAge: 1000*60*60*24, httpOnly: true})
//     res.send("you set the cookie");
// })


// app.get("/get-cookies", (req, res) => {
//     const cookies = req. cookies;
//     console.log("cokkies", cookies);
//     res.json(cookies);
// })

app.listen(PORT, () => {
    console.log(`server is running at port 8080`)
    connection()
})