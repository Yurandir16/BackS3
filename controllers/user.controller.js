import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getUser } from '../models/user.model.js'
import { transporter } from '../config/mailer.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})


const user_create = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    getUser.create({
        name,
        email,
        password,
    },
        { fields: ['name', 'email', 'password'] })
        .then(users => {
            res.send(users)

            const emailconfirm = async (res) => {
                const token = jwt.sign({
                    to: email,
                }, 'secret', { expiresIn: '30m' }, data.parsed.JWT_TOKEN_SECRET, { algorithm: 'HS256' })
                const url = `http://yuralifting.hopto.org/Confirmation?${token}&email=${email}`
                await transporter.sendMail({
                    from: ' <201239@ids.upchiapas.edu.mx>', // sender address
                    to: email, // list of receivers
                    subject: "Confirmation Acount", // Subject line
                    html: `<!doctype html>
                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    
                    <head>
                        <title>
                    
                        </title>
                        <!--[if !mso]><!-- -->
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <!--<![endif]-->
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style type="text/css">
                            #outlook a {
                                padding: 0;
                            }
                    
                            .ReadMsgBody {
                                width: 100%;
                            }
                    
                            .ExternalClass {
                                width: 100%;<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                <tr>
                                    <a href='${url}' align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                        <p style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                            Confirm Tu Email
                                        </p>
                                    </a>
                                </tr>
                            </table>
                    
                            body {
                                margin: 0;
                                padding: 0;
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                            }
                    
                            table,
                            td {
                                border-collapse: collapse;
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                            }
                    
                            img {
                                border: 0;
                                height: auto;
                                line-height: 100%;
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                            }
                    
                            p {
                                display: block;
                                margin: 13px 0;
                            }
                        </style>
                        <!--[if !mso]><!-->
                        <style type="text/css">
                            @media only screen and (max-width:480px) {
                                @-ms-viewport {
                                    width: 320px;
                                }
                                @viewport {
                                    width: 320px;
                                }
                            }
                        </style>
                        <!--<![endif]-->
                        <!--[if mso]>
                            <xml>
                            <o:OfficeDocumentSettings>
                              <o:AllowPNG/>
                              <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentSettings>
                            </xml>
                            <![endif]-->
                        <!--[if lte mso 11]>
                            <style type="text/css">
                              .outlook-group-fix { width:100% !important; }
                            </style>
                            <![endif]-->
                    
                    
                        <style type="text/css">
                            @media only screen and (min-width:480px) {
                                .mj-column-per-100 {
                                    width: 100% !important;
                                }
                            }
                        </style>
                    
                    
                        <style type="text/css">
                        </style>
                    
                    </head>
                    
                    <body style="background-color:#f9f9f9;">
                    
                    
                        <div style="background-color:#f9f9f9;">
                    
                    
                            <!--[if mso | IE]>
                          <table
                             align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->
                    
                    
                            <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
                    
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                                <!--[if mso | IE]>
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    
                            <tr>
                          
                            </tr>
                          
                                      </table>
                                    <![endif]-->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                    
                            </div>
                    
                    
                            <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          
                          <table
                             align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->
                    
                    
                            <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
                    
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                                <!--[if mso | IE]>
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    
                            <tr>
                          
                                <td
                                   style="vertical-align:bottom;width:600px;"
                                >
                              <![endif]-->
                    
                                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
                    
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
                    
                                                        <tr>
                                                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                    
                                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                    <tbody>
                                                                        <tr>
                                                                        <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                                                                        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:45px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                                        </div>
                            
                                                                    </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                    
                                                            </td>
                                                        </tr>
                    
                                                        <tr>
                                                            <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                    
                                                                <div  style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:32px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                                Please confirm your email
                                                                </div>
                    
                                                            </td>
                                                        </tr>
                    
                                                        <tr>
                    
                                                        <tr>
                                                            <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:20px;word-break:break-word;">
                    
                                                                <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#555;">
                                                                Validate your email address to start using.
                                                                </div>
                    
                                                            </td>
                                                        </tr>
                    
                                                        <tr>
                                                            <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:40px;word-break:break-word;">
                    
                                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                            <tr>
                                                                <td href='${url}' align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                                                    <a href='${url}' style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                                                    Confirma Email
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                    
                                                            </td>
                                                        </tr>
                    
                                                    </table>
                    
                                                </div>
                    
                                                <!--[if mso | IE]>
                                </td>
                              
                            </tr>
                          
                                      </table>
                                    <![endif]-->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                    
                            </div>
                    
                    
                            <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          
                          <table
                             align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->
                    
                    
                            <div style="Margin:0px auto;max-width:600px;">
                    
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                                <!--[if mso | IE]>
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    
                            <tr>
                          
                                <td
                                   style="vertical-align:bottom;width:600px;"
                                >
                              <![endif]-->
                    
                                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
                    
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td style="vertical-align:bottom;padding:0;">
                    
                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    
                                                                        <tr>
                                                                        <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
        
                                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                        UP Chiapas. City Suchiapa, MX
                                                                    </div>
        
                                                                </td>
                                                                        </tr>
                    
                                                                        <tr>
                                                                        <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:20px;text-align:center;color:#7F8FA4;">
                                                    If you did not make this request, simply ignore this email. Otherwise, click the button above.
                                                    </div>
        
                                                </td>
                                            </tr>
                                                                        </tr>
                    
                                                                    </table>
                    
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                    
                                                </div>
                    
                                                <!--[if mso | IE]>
                                </td>
                              
                            </tr>
                          
                                      </table>
                                    <![endif]-->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                    
                            </div>
                    
                    
                            <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          <![endif]-->
                    
                    
                        </div>
                    
                    </body>
                    
                    </html>`

                })

            }
            emailconfirm();

        })
        .catch(err => {
            res.status(400).send(err)
        });
};

const confirmation = async (req, res) => {
    const email = req.body.email;
    const confi = req.body.valor;
    if (confi === 'false') {
        console.log('confirmations failed')
        getUser
            .destroy({ where: { email: email } })
            .then((r) => {
                res.status(200).json({ message: "Deleted successfully" });
            })
            .catch((err) => {
                res.status(400).send(err);
            });

    }

    if (confi === 'true') {
        getUser.findOne({ where: { email: email } })
            .then(users => {
                users.update({ validat: (confi) })
                res.status(200).json({ message: 'Usuario Confirmado' })
            })
            .catch((err) => {
                res.status(400).json({ err: 'Usuario Confirmado Error' })
            });

    }

}


const user_validat = async function (req, res) {
    getUser
        .findAll()
        .then((r) => {
            //res.send(r);
            r.status(200).json(r.name)
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const user_update = (req, res) => {
    const email = req.body.email
    getUser.findOne({ where: { email: email } })
        .then(users => {
            users.update({ password: bcryptjs.hashSync(req.body.password, 10) })
            res.status(200).json({ err: 'contraseña Actualizada' })
        })
        .catch((err) => {
            res.status(400).json({ err: 'contraseña No Actualizado' })
        });
};
const user_login = async (req, res) => {
    const user = await getUser.findOne({ where: { email: req.body.email } });
    if (user) {
        const validPassword = bcryptjs.compareSync(req.body.password, user.password);
        if (user.validat === true) {
            if (validPassword) {
                const token = jwt.sign({
                    sub: user.name,
                    id: user.id,
                }, 'secret', { expiresIn: '30m' }, data.parsed.JWT_TOKEN_SECRET, { algorithm: 'HS256' })
                user.token = token;

                res.header('auth-token', token).json({
                    error: null,
                    data: { token, user: user.id, name: user.name, validate: user.validate }
                });

            }
            else {
                return res.status(400).json({ error: 'contraseña no válida' })
            }
        } else {
            return res.status(400).json({ error: "Usuario no verificado" });
        }
    }
    else {
        return res.status(400).json({ error: 'Usuario no encontrado' });
    }


};

export const userController = { user_create, user_login, user_update, confirmation, user_validat };