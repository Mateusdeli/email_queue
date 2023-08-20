import nodemailer, { Transporter } from "nodemailer";
import MailSendOptions from "../interfaces/mail-send-options";
import { MailConfig } from "../interfaces/mail-config";

export default class Mail {
  constructor(private readonly mail: MailConfig) {}

  async send(options: MailSendOptions) {
    const transporter = this.getTransporter();
    await transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.template,
    });
  }

  private getTransporter(): Transporter {
    return nodemailer.createTransport({
      ...this.mail,
      secure: this.mail.secure || false
    });
  }
}
