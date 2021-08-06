import { Request, Response } from "express";
import { MailerService }  from "../service/MailerService";

class SendEmailController {
  async handle(request: Request, response: Response) {
    try {
      const mailerService = new MailerService();
      await mailerService.sendMail("pamelabc0808@gmail.com", "App Med One!!", "Teste aplicação");    
      return response.status(200).send("OK!")
    } catch(error){
      console.error(error);
      throw new Error("Could not send the email.");
    }

  }
}

export { SendEmailController };
