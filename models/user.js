import mongoose, {Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const UserSchema = new Schema({
    email: {type: String, required: [true, "Please enter an email"], unique: true, lowercase: true, validate: [isEmail, "Please enter a valid email"]},
    username: {type: String, required: [true, "Please enter username"], lowercase: true},
    password: {type: String, required: [true, "Please enter a password"], minlength: [6, "Minimum password length is 6 characters"]}
})

export const UserModel = model("User", UserSchema)