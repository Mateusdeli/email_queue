export default interface MailSendOptions {
  from: string;
  to: string;
  subject: string;
  template: string;
  metadata?: any;
}
