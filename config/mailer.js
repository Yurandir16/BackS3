import nodemailer from 'nodemailer'
import { dataEnv } from './env.config.js';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    auth: {
      user: dataEnv.parsed.USEREMAIL, // generated ethereal user
      pass: dataEnv.parsed.EMAILPASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
});

export const validate ={
   port: dataEnv.parsed.PORTEMAIL,
};

