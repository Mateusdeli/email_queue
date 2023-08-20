export default interface MailTemplate {
  getBody(data?: any): string;
}
