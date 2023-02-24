import UserController from "../app/http/controllers/user.controller";
import {Router} from "express";
import {Auth} from "../app/http/middlewares/Auth";
import {UpdateValidator} from "../app/http/validations/user.validator";
import {validationRequest} from "../app/http/middlewares/ValidationRequest";

const userRouter: Router = Router()

userRouter.get("/me", Auth, UserController.Me)
userRouter.patch("/me", UpdateValidator(), validationRequest, Auth, UserController.Update)
userRouter.delete("/me", Auth, UserController.Destroy)

export default userRouter;