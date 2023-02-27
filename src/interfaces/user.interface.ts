import {Types} from "mongoose";

export interface IUser {
    _id?: Types.ObjectId
    first_name: string,
    last_name: string,
    user_name: string,
    phone: string,
    password: string,
}

export interface IUserMethods {
    fullName(): string;
}