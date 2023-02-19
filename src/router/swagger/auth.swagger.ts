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


/**
 * @swagger
 * /auth/refresh:
 *      post:
 *          summary: Refresh Token
 *          tags:
 *              - Auth
 *          description: Send Refresh Token for Get new Token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
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