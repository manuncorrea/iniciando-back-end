import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealEmailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const messege = await this.client.sendMail({
        from: 'Equipe GoBarber <equipe@gobarber.com>',
        to,
        subject: 'Recuperação de senha ✔',
        text: body,    
    });

    console.log('Message sent: %s', messege.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(messege));
  }
    
}