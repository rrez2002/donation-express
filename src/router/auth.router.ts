import {Router} from "express";
import AuthController from "../app/http/controllers/auth.controller";
import {LoginValidator, RegisterValidator} from "../app/http/validations/auth.validator";
import {Auth} from "../app/http/middlewares/Auth";

const authRouter : Router = Router()
authRouter.post("/register", RegisterValidator(), AuthController.Register)
authRouter.post("/login", LoginValidator(), AuthController.Login)
authRouter.post("/logout",Auth, AuthController.Logout)

export default authRouter;