/**
 *@swagger
 *  components:
 *      schemas:
 *          Gateway:
 *              type: object
 *              required:
 *                  -   amount
 *              properties:
 *                  amount:
 *                      type: number
 *                      example: 1000
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
 *
 *
 */