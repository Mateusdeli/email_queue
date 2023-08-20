import MailTemplate from "../interfaces/mail-template";

export default class MailSender {
    constructor(
        readonly from: string,
        readonly to: string,
        readonly subject: string,
        readonly template: MailTemplate,
        readonly metadata?: any
    ) {}

    getTemplate(): string {
        return this.template.getBody(this.metadata)
    }
}