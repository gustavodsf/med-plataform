import nodemailer from "nodemailer";
import { google } from "googleapis";
import { Response } from "express";
const OAuth2 = google.auth.OAuth2;

class MailerService {

  async sendMail(to: string, subject: string, text: string){
    const oauth2Client = new OAuth2(
        process.env.EMAIL_CLIENT_ID,
        process.env.EMAIL_CLIENT_SECRET
    );

    oauth2Client.setCredentials({refresh_token: process.env.EMAIL_REFRESH_TOKEN});
    const accessToken = await oauth2Client.getAccessToken()

    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "appmedone@gmail.com",
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      }
    });

    const mailOptions = {
      from: "appmedone@gmail.com",
      to: to,
      subject: subject,
      generateTextFromHTML: true,
      html: text
    };
  
    await smtpTransport.sendMail(mailOptions, (error: Error, response: Response) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
  }
}

export { MailerService };