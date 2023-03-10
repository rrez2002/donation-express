import {Request, Response} from "express";
import UserService from "../../services/user.service";
import {UserResponse} from "../resources/user.response";
import {ErrorResponse} from "../resources/error.response";
import {JsonResponse, messageResponse} from "../resources/response";

class UserController{
    async Me(req: Request, res: Response): Promise<UserResponse>  {
        const user = req.user

        return new UserResponse(res , user)
    }

    async Update(req: Request, res: Response):Promise<JsonResponse<messageResponse>> {
        try {
            const id = req.user?._id
            const body = req.body;

            if (!id) return new ErrorResponse(res , {
                message: "user not found"
            })

            await UserService.Update(id, body)

            return new JsonResponse(res,{
                message: "update user success"
            });
        }catch (e) {
            return new ErrorResponse(res , e as Error)
        }
    }

    async Destroy(req: Request, res: Response):Promise<JsonResponse<messageResponse>> {
        try {
            const id = req.user?._id

            if (!id) return new ErrorResponse(res, {
                    message: "user not found"
                });

            await UserService.Destroy(id)

            return new JsonResponse(res, {
                message: "delete user success"
            });

        }catch (e) {
            return new ErrorResponse(res , e as Error)
        }
    }
}

export default new UserController