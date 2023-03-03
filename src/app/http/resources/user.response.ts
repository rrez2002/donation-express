import {Types} from "mongoose";
import {User} from "../../models/user.model";
import {Response as ExpressResponse} from "express";
import {Response} from "./response";

export interface IUserResponse {
    _id?: Types.ObjectId
    first_name: string,
    last_name: string,
    user_name: string,
    phone: string,
}

export class UserResponse extends Response<User>{
    constructor(
        public res: ExpressResponse,
        public data: User,
        public status: number = 200,
    ) {
        super(res, data, status);
        this.toJson<IUserResponse>()
    }

    toJson<R>(): ExpressResponse<R> {
        return this.res.status(this.status).json({
            _id: this.data._id,
            first_name: this.data.first_name,
            last_name: this.data.last_name,
            user_name: this.data.user_name,
            phone: this.data.phone,
        })
    }


}