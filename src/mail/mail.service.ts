import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer"; // <-- TO‘G‘RI import
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailAdmin(user: any) {
    const url = `${process.env.API_URL}/api/auth/activate/${user.activationLink}`;
    console.log("Activation link:", url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to PrivateSchool App!",
      template: "confirmation",
      context: {
        username: user.full_name,
        url,
      },
    });
  }
  async sendMailParent(user: any) {
    const url = `${process.env.API_URL}/api/auth/commit/${user.activationLink}`;
    console.log("Activation link:", url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to PrivateSchool App!",
      template: "confirmation",
      context: {
        username: user.full_name,
        url,
      },
    });
  }
}
