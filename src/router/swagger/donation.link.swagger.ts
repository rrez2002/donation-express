/**
 * @swagger
 *  components:
 *      schemas:
 *          StoreDonationLink:
 *              type: object
 *              required:
 *                  -   link
 *              properties:
 *                  link:
 *                      type: string
 *                      example:
 *                  amount :
 *                      type: string
 *                      example:
 *          UpdateDonationLink:
 *              type: object
 *              properties:
 *                  link:
 *                      type: string
 *                      example:
 *                  amount :
 *                      type: string
 *                      example:
 *
 */

/**
 * @swagger
 *  definitions:
 *      DonationLinks:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example:
 *                  link:
 *                      type: string
 *                      example:
 *                  amount :
 *                      type: string
 *                      example:
 *
 *      DonationLink:
 *          type: object
 *          properties:
 *             _id:
 *                  type: string
 *                  example:
 *             link:
 *                  type: string
 *                  example:
 *             amount :
 *                  type: string
 *                  example:
 *      StoreDonationLink:
 *          type: object
 *          properties:
 *             message:
 *                  type: string
 *                  example: create donation_link success
 *      UpdateDonationLink:
 *          type: object
 *          properties:
 *             message:
 *                  type: string
 *                  example: update donation_link success
 *      DeleteDonationLink:
 *          type: object
 *          properties:
 *             message:
 *                  type: string
 *                  example: delete donation_link success
 *      NotFoundDonationLink:
 *          type: object
 *          properties:
 *             message:
 *                  type: string
 *                  example: donation_link not found
 *
 */


/**
 * @swagger
 *  /donation_link:
 *      get:
 *          tags: [DonationLink]
 *          summary: get donation links
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DonationLinks'
 *              400:
 *                  description: Bad Request
 *
 *
 */

/**
 * @swagger
 *  /donation_link:
 *      post:
 *          tags: [DonationLink]
 *          summary: create donation link
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/StoreDonationLink'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/StoreDonationLink'
 *              404:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFoundDonationLink'
 *              400:
 *                  description: Bad Request
 */


/**
 * @swagger
 *  /donation_link/{id}:
 *      get:
 *          tags: [DonationLink]
 *          summary: get donation link by ObjectId
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DonationLink'
 *              404:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFoundDonationLink'
 *              400:
 *                  description: Bad Request
 *
 *
 */


/**
 * @swagger
 *  /donation_link/{id}:
 *      patch:
 *          tags: [DonationLink]
 *          summary: update donation link by ObjectId
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          requestBody:
 *              content:
 *                  schema:
 *                      $ref: '#/definitions/DonationLink'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/UpdateDonationLink'
 *              404:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFoundDonationLink'
 *              400:
 *                  description: Bad Request
 *
 *
 */


/**
 * @swagger
 *  /donation_link/{id}:
 *      delete:
 *          tags: [DonationLink]
 *          summary: delete donation link by ObjectId
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DeleteDonationLink'
 *              404:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFoundDonationLink'
 *              400:
 *                  description: Bad Request
 *
 *
 */