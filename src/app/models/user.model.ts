import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    user_name: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {
    timestamps: true
})

export const UserModel = model("user", UserSchema);