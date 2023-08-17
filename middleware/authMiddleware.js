import jwt from "jsonwebtoken"

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check jwt-token exist and verified 
    if (token) {
        jwt.verify(token, "farah", (err, decodedToken) => {
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