import {IUser, User, UserModel} from "../models/user.model";
import {Types} from "mongoose";

export default new class UserService{
    async FindById(id:Types.ObjectId):Promise<User> {
        try {
            const user = await UserModel.findById({_id: id}, {
                first_name: 1, last_name: 1, user_name: 1, phone: 1,
            });

            if (!user) return Promise.reject({
                message: "user not found"
            });

            return Promise.resolve(user);
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async FindByUserName(user_name:string):Promise<User>{
        try {
            const user:User|null = await UserModel.findOne({user_name},  {
                first_name: 1, last_name: 1, user_name: 1, phone: 1,
            });

            if (!user) return Promise.reject({
                message: "user not found"
            });

            return Promise.resolve(user);
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

    async Update(id:Types.ObjectId,body:Partial<IUser>):Promise<any>{
        try {
            await UserModel.updateOne({_id: id}, {
                $set: body
            });

            return Promise.resolve();
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

    async Destroy(id:Types.ObjectId):Promise<any>{
        try {
            await UserModel.deleteOne({_id: id});

            return Promise.resolve();
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }
}
