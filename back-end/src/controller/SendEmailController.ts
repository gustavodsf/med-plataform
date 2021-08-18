import { Request, Response } from "express";
import { MailerService }  from "../service/MailerService";

class SendEmailController {
  async handle(request: Request, response: Response) {
    try {
      const mailerService = new MailerService();
      await mailerService.sendMail("gustavodsf1@gmail.com", "App Med One!!", "Teste aplicação");    
      return response.status(200).send("OK!")
    } catch(error){
      console.error(error);
      throw new Error("Could not send the email.");
    }

  }

  async sendCreateUserMessage(request: Request, response: Response) {
    const { email, password } = request.body;
    const mailerService = new MailerService();
    let mail_text = "<p>Olá! Você acabou de ser cadastrado na plataforma Med One.</p><br />" +
                    `<p>Utilizando o seguinte e-mail: ${email}</p><br />` +
                    `<p>A seguinte senha: ${password}</p><br />` +
                    `<span> Por Favor! Troque a senha no seu primeiro primeiro acesso.</span><br /><br /><br /><br />`+
                    `Atenciosamente<br />Med One`;
    await mailerService.sendMail(email, "Bem Vindo ao Aplicativo Med One!", mail_text);    
  }
}

export { SendEmailController };
