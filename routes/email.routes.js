import { Router } from 'express';
import { emailController } from '../controllers/email.controller.js';


/**
 * @openapi
 * '/api/email/send':
 *  post:
 *     tags:
 *     - email
 *     summary: send email
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - to
 *              - subject
 *              - text
 *            properties:
 *              to:
 *                type: string
 *                default: arisel583@gmail.com
 *     responses:
 *      200:
 *        description: send
 *      400:
 *        description: Bad send
 *      404:
 *        description: Not Found
 */



const router = Router();

router.post('/send', async (req, res) =>{emailController.email_password(req, res)})

export default router