import {UserModel} from "../models/user.model";
import {IUser} from "../../interfaces/user.interface";
import {Types} from "mongoose";

export default new class UserService{
    async Update(id:Types.ObjectId,body:IUser):Promise<any>{
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
