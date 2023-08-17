import mongoose, {Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    email: {type: String, required: [true, "Please enter an email"], unique: true, lowercase: true, validate: [isEmail, "Please enter a valid email"]},
    username: {type: String, required: [true, "Please enter username"], lowercase: true},
    password: {type: String, required: [true, "Please enter a password"], minlength: [6, "Minimum password length is 6 characters"]}
})

// FIRE FUNCTION AFTER USER SAVE TO DB
// UserSchema.post("save", (docs, next) => {
//     console.log("New user was created and saved", docs);
//     next();
// })

//  STATIC METHOD FOR USER LOGIN
UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    console.log("user", user); 
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}


// FIRE FUNCTION BEFORE USER SAVE TO DB
UserSchema.pre("save", async function(next){
    const salt  = await bcrypt.genSalt()
    console.log("genSalt", salt);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

export const UserModel = model("User", UserSchema)