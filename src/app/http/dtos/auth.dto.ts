import { IUser } from "../../models/user.model";

type RegisterDTO = Omit<IUser, "_id">;

type LoginDTO = Pick<IUser, "user_name" | "password">;

export {
    RegisterDTO,
    LoginDTO,
}