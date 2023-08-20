import { Queue as BullQueue } from "bullmq";
import MailJob from "../interfaces/mail-job";
import ConnectionConfig from "../interfaces/connection-config";
import { Redis } from "ioredis";
import Logger from "../utils/logger";

export default class Queue {
  private readonly DEFAULT_NAME = "Main";

  private queue: BullQueue;

  constructor(
    private readonly connection: Redis,
    private readonly name?: string
  ) {
    const queueName = this.name || this.DEFAULT_NAME;
    this.queue = new BullQueue(queueName, { connection });
  }

  async add(payload: MailJob): Promise<void> {
    try {
      await this.queue.add(payload.name, this.hydrate(payload));
    } catch (error) {
      this.sendErrorLog();
      throw error;
    }
  }

  async addAll(payload: MailJob[]): Promise<void> {
    try {
      const jobs: MailJob[] = [];
      for (const iterator of payload) {
        jobs.push(this.hydrate(iterator));
      }
      await this.queue.addBulk(jobs);
    } catch (error) {
      this.sendErrorLog();
      throw error;
    }
  }

  private hydrate(payload: MailJob): any {
    return {
      ...payload.data,
      template: payload.data.getTemplate(),
    };
  }

  private sendErrorLog() {
    Logger.log('An error occurred while adding process to queue.')
  }
}
