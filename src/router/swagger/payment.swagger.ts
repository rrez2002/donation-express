/**
 *@swagger
 *  components:
 *      schemas:
 *          Gateway:
 *              type: object
 *              required:
 *                  -   gateway
 *                  -   amount
 *              properties:
 *                  name:
 *                      type: string
 *                  phone:
 *                      type: string
 *                      example: "0900000000"
 *                  gateway:
 *                      type: string
 *                      enum:
 *                          - payir
 *                          - zarinpal
 *                      example: payir
 *                  amount:
 *                      type: number
 *                      example: 1000
 *                  description:
 *                      type: string
 *                      example: description
 *                  validCardNumber:
 *                      type: string
 *                      example: "****************"
 *
 */

/**
 *@swagger
 *  definitions:
 *      GatewayResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *              token:
 *                  type: string
 *      BadRequestResponse:
 *          type: object
 *          properties:
 *              errorMessage:
 *                  type: string
 *
 *
 *
 */

/**
 *@swagger
 *  /payment/{donation_link}:
 *      post:
 *          summary: get gateway for donation
 *          tags:
 *              - Payment:
 *          consumes:
 *              - application/x-www-form-urlencoded
 *          parameters:
 *                  -   in: path
 *                      name: donation_link
 *                      type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Gateway'
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/GatewayResponse'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/BadRequestResponse'
 *
 *
 */