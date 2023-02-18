import {Router} from "express";
import AuthController from "../app/http/controllers/auth.controller";
import {LoginValidator, RegisterValidator} from "../app/http/validations/auth.validator";
import {Auth} from "../app/http/middlewares/Auth";
import {validationRequest} from "../app/http/middlewares/ValidationRequest";

const authRouter: Router = Router()
/**
 * @swagger
 * /auth/register:
 *      post:
 *          summary: Register User
 *          tags:
 *              - Auth
 *          description: Send User Information for  Registration
 *          consumes:
 *              - application/x-www-form-urlencoded
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              first_name:
 *                                  type: string
 *                                  example: firstname
 *                              last_name:
 *                                  type: string
 *                                  example: lastname
 *                              user_name:
 *                                  type: string
 *                                  example: username
 *                              phone:
 *                                  type: string
 *                                  example: 090100000000
 *                              password:
 *                                  type: string
 *                                  example: password
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                 token:
 *                                      type: string
 *                                 refreshToken:
 *                                      type: string
 *              400:
 *                  description: Bad Request
 *
 */
authRouter.post("/register", RegisterValidator(), validationRequest, AuthController.Register)
/**
 * @swagger
 * /auth/login:
 *      post:
 *          summary: Login User
 *          tags:
 *              - Auth
 *          description: Send User Information for  Login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user_name:
 *                                  type: string
 *                                  example: rrez2002
 *                              password:
 *                                  type: string
 *                                  example: password
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *                                  refreshToken:
 *                                      type: string
 *              400:
 *                  description: Bad Request
 *
 */
authRouter.post("/login", LoginValidator(), validationRequest, AuthController.Login)
authRouter.post("/refresh", AuthController.RefreshToken)
authRouter.post("/logout", Auth, AuthController.Logout)

export default authRouter;