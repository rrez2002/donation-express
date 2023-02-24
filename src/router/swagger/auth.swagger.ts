/**
 * @swagger
 *  components:
 *      schemas:
 *          Register:
 *              type: object
 *              required:
 *                  -   first_name
 *                  -   last_name
 *                  -   user_name
 *                  -   phone
 *                  -   password
 *              properties:
 *                  first_name:
 *                      type: string
 *                      example: firstname
 *                  last_name:
 *                      type: string
 *                      example: lastname
 *                  user_name:
 *                      type: string
 *                      example: username
 *                  phone:
 *                      type: string
 *                      example: 090100000000
 *                  password:
 *                      type: string
 *                      example: password
 *          Login:
 *              type: object
 *              required:
 *                  -   user_name
 *                  -   password
 *              properties:
 *                  user_name:
 *                      type: string
 *                      example: username
 *                  password:
 *                      type: string
 *                      example: password
 *
 */

/**
 * @swagger
 *  definitions:
 *      AuthResponse:
 *          type: object
 *          properties:
 *             token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicnJlejIwMDIiLCJpYXQiOjE2NzY4MzA5MzEsImV4cCI6MTY3NzA5MDEzMX0.o8ExAo-5_DPR29ULDkfIxFoE0B_S-UzQ_PLO9FcLNc4
 *             refreshToken:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicnJlejIwMDIiLCJpYXQiOjE2NzY4MzA5MzEsImV4cCI6MTY3NzI2MjkzMX0.aadT7HE9cUMervKDsvqiVodAZrHayVDQZWQR7XIFhM8
 *
 */

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
 *                          $ref: '#/components/schemas/Register'
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/AuthResponse'
 *              400:
 *                  description: Bad Request
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
 *                             $ref: '#/components/schemas/Login'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/definitions/AuthResponse'
 *              400:
 *                  description: Bad Request
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
 *                             $ref: '#/definitions/AuthResponse'
 *              400:
 *                  description: Bad Request
 *
 */