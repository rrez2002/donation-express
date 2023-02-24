/**
 * @swagger
 *  components:
 *      schemas:
 *          UserUpdate:
 *              type: object
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
 *
 */

/**
 * @swagger
 *  definitions:
 *      UserInformation:
 *          type: object
 *          properties:
 *              first_name:
 *                  type: string
 *                  example: firstname
 *              last_name:
 *                  type: string
 *                  example: lastname
 *              user_name:
 *                  type: string
 *                  example: username
 *              phone:
 *                  type: string
 *                  example: 090100000000
 *              password:
 *                  type: string
 *      UpdateUser:
 *          type: object
 *          properties:
 *             message:
 *                  type: string
 *                  example: update donation_link success
 *      DeleteUser:
 *          type: object
 *          properties:
 *             message:
 *                  type: string
 *                  example: delete donation_link success
 *
 */

/**
 * @swagger
 *  /user/me:
 *      get:
 *          tags: [User]
 *          summary: get user information
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/UserInformation'
 *              400:
 *                  description: Bad Request
 *      patch:
 *          tags: [User]
 *          summary: update user information
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UserUpdate'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/UpdateUser'
 *              400:
 *                  description: Bad Request
 *      delete:
 *          tags: [User]
 *          summary: destroy user information
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DeleteUser'
 *              400:
 *                  description: Bad Request
 *
 *
 */