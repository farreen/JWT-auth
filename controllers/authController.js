import { UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";
const handleError = (err) => {
    console.log("err....", err.message)
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

    // HANDLING ERRORS FOR LOGIN ROUTE
    // incorrect emails
    if(err.message === "incorrect email"){
        errors.email="incorrect email";
    }
    if(err.message === "incorrect password"){
        errors.password = "incorrect password";
    }
    return errors;
}


// CREATE JWT TOKEN
const maxAge = 60*60*24*5;
const createToken = (id) => {
    return jwt.sign({id}, "farah", {
        expiresIn: maxAge
    })
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
        const saved_user = await UserModel.create({ email, username, password })
        console.log("saved", saved_user)
        const token = createToken(saved_user._id)
        res.cookie("jwt-token", token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(201).json({user: saved_user._id})
    } catch (err) {
        const error = handleError(err);
        res.status(500).json(error);
    }
}

// AUTHENTICATE A CURRENT USER
export const login_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id)
        res.cookie("jwt-token", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ userLoggedin: user._id })
    } catch (error) {
        console.log("error", error)
        const err = handleError(error);
        res.status(400).json(err)
    }
}
