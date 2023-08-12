import mongoose from "mongoose";

const connection = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/jwt-auth")
    mongoose.connection.on("connected", () => {
        console.log("Database connected successfully.")
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Database disconnected.")
    })

    mongoose.connection.on("Error", () => {
        console.log("Error", Error.message)
    })
}

export default connection;