const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.REACT_APP_CLIENT_ID,
    process.env.REACT_APP_CLIENT_SECRET, // Client Secret
);

oauth2Client.setCredentials({
  refresh_token: process.env.REACT_APP_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "appmedone@gmail.com",
       clientId: process.env.REACT_APP_CLIENT_ID,
       clientSecret: process.env.REACT_APP_CLIENT_SECRET,
       refreshToken: process.env.REACT_APP_REFRESH_TOKEN,
       accessToken: accessToken,
       rejectUnauthorized: false
  }
});


function sendMail(to: string, subject: string, text: string){
  const mailOptions = {
    from: "appmedone@gmail.com",
    to: to,
    subject: subject,
    generateTextFromHTML: true,
    html: text
  };

  smtpTransport.sendMail(mailOptions, (error:any , response: any) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });
}
export { sendMail }
