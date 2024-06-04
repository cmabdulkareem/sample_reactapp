import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email : String,
    password : String,
    admin: {type: Boolean, default: false}
})

const UserModel = mongoose.model("users", UserSchema)

export default UserModel;