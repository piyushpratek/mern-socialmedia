import nodemailer from "nodemailer"
import { SMPT_HOST, SMPT_MAIL, SMPT_PASSWORD, SMPT_PORT } from "../config/config";

interface EmailOptions {
  email: string
  subject: string
  message: string
}

export const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: SMPT_HOST,
    port: parseInt(SMPT_PORT),
    auth: {
      user: SMPT_MAIL,
      pass: SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
