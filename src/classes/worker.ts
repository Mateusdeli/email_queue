import { Worker as BullWorker, Job } from "bullmq";
import Mail from "./mail";
import MailSendOptions from "../interfaces/mail-send-options";
import Logger from "../utils/logger";

export default class Worker {
  constructor(private readonly mail: Mail) {}

  async run(queueName: string) {
    try {
      new BullWorker(queueName, async (job: Job<MailSendOptions>) => {
        const { to, subject, template, from, metadata } = job.data;
        await this.mail.send({
          from,
          to,
          subject,
          metadata,
          template,
        });
      });
    } catch (error) {
      Logger.log('An error occurred in processing.');
      throw error;
    }
  }
}
