import SMTPTransport from "nodemailer/lib/smtp-transport";

export type MailConfig = SMTPTransport & SMTPTransport.Options | SMTPTransport.Options