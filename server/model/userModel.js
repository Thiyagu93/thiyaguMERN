import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
    },
    confirmpassword: {
        type: String,
    },
    age:{
        type: Number
    },
    dob:{
        type: String
    },
    mobile: {
        type: Number
    },
    gender: {
        type: String
    }
})

export default mongoose.model("data", UserSchema)