import { IUser } from "../../models/user.model";

export type FindByIdDTO = Pick<IUser, "_id">;;
export type FindByUserNameDTO = Pick<IUser, "user_name">;
export type UpdateDTO = Partial<IUser>;