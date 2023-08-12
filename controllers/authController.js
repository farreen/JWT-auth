// SIGN UP PAGE 
export const signup_get = (req, res) => {
    res.send("signup_get")
}
// LOGIN PAGE
export const login_get = (req, res) => {
    res.send("login_get");
}

// CREATE A NEW USER IN THE DATABASE
export const signup_post = (req, res) => {
    res.send("New Signup")
}

// AUTHENTICATE A CURRENT USER
export const login_post = (req, res) => {
    res.send("login_post")
}
