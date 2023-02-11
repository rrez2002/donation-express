import {Router} from "express";
import AuthController from "../app/http/controllers/auth.controller";
import {LoginValidator, RegisterValidator} from "../app/http/validations/auth.validator";

const authRouter : Router = Router()
authRouter.post("/register", RegisterValidator(), AuthController.Register)
authRouter.post("/login", LoginValidator(), AuthController.Login)

export default authRouter;