import {Model, model, Schema, Types} from "mongoose";
import {hashSync} from "bcrypt";

interface IUser {
    _id: Types.ObjectId
    first_name: string,
    last_name: string,
    user_name: string,
    phone: string,
    password: string,
}

interface IUserMethods {
    fullName(): string;
}

export type User = IUser & IUserMethods

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    first_name: {type: String, required: true, min:3,max:30},
    last_name: {type: String, required: true, min:3,max:30},
    user_name: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {
    timestamps: true
})

UserSchema.pre('save', function (next) {
    this.password = hashSync(this.password, 10)
    next();
});

UserSchema.method('fullName', function fullName() {
    return `${this.first_name} ${this.last_name}`;
});

export const UserModel: UserModel = model<IUser, UserModel>("User", UserSchema);