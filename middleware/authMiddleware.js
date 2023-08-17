import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY
export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwtToken;
    // check jwt-token exist and verified 
    if (token) {
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                // redirect user to login page
                res.status(401).send("token not available");
            } else {
                console.log("decodedToken", decodedToken);
                next();
            }
        })
    } else {
        // if there is no token available then redirect user to the login page
        res.status(401).send("token not available");
    }
}