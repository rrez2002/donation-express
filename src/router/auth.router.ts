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
 *          parameters:
 *             - name: first_name
 *               in: formData
 *               required: true
 *               type: string
 *
 *             - name: last_name
 *               in: formData
 *               required: true
 *               type: string
 *
 *             - name: user_name
 *               description: unique username
 *               in: formData
 *               required: true
 *               type: string
 *
 *             - name: phone
 *               description: IR phone number
 *               in: formData
 *               required: true
 *               type: string
 *
 *             - name: password
 *               description: password
 *               in: formData
 *               required: true
 *               type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              responseText:
 *                                  type: string
 *                                  example: This is some example string! This is an endpoint
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
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
 *          summary: Register User
 *          tags:
 *              - Auth
 *          description: Send User Information for  Registration
 *          consumes:
 *              - application/x-www-form-urlencoded
 *          parameters:
 *             - name: user_name
 *               description: unique username
 *               in: formData
 *               required: true
 *               type: string
 *             - name: password
 *               description: password
 *               in: formData
 *               required: true
 *               type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              responseText:
 *                                  type: string
 *                                  example: This is some example string! This is an endpoint
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
 *              400:
 *                  description: Bad Request
 *
 */
authRouter.post("/login", LoginValidator(), validationRequest, AuthController.Login)
authRouter.post("/refresh", AuthController.RefreshToken)
authRouter.post("/logout", Auth, AuthController.Logout)

export default authRouter;