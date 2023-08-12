import { UserModel } from "../models/user.js";

const handleError = (err) => {
    console.log("err....", err.code)
    let errors = { email: "", username: "", password: "" }

    // duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors
    }

    // validation error
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}


// SIGN UP PAGE 
export const signup_get = (req, res) => {
    res.send("signup_get")
}
// LOGIN PAGE
export const login_get = (req, res) => {
    res.send("login_get");
}

// CREATE A NEW USER IN THE DATABASE
export const signup_post = async (req, res) => {
    console.log("req_data", req.body)
    const { email, username, password } = req.body
    try {
        const saved_data = await UserModel.create({ email, username, password })
        console.log("saved", saved_data)
        res.status(200).send(`New Signup${saved_data}`)
    } catch (err) {
        const error = handleError(err);
        res.status(500).json(error);
    }
}

// AUTHENTICATE A CURRENT USER
export const login_post = (req, res) => {
    res.send("login_post")
}
