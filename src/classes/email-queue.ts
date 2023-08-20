import ConnectionConfig from "../interfaces/connection-config";
import { MailConfig } from "../interfaces/mail-config";
import Mail from "./mail";
import Queue from "./queue";
import Worker from "./worker";
import QueueData from "./queue-data";
import Connection from "./connection";
import { Redis } from "ioredis";

export default class EmailQueue {
  private readonly connection: Redis;
  private readonly emailConfig: MailConfig;
  private readonly email: Mail;

  constructor(emailConfig: MailConfig, connectionConfig: ConnectionConfig) {
    const conn = new Connection(connectionConfig);
    this.connection = conn.getConnection();
    this.emailConfig = emailConfig;
    this.email = new Mail(this.emailConfig);
  }

  async add(data: QueueData): Promise<void> {
    const queue = new Queue(this.connection, data.name);
    await queue.add(data.payload);
  }

  async addAll(data: QueueData): Promise<void> {
    const queue = new Queue(this.connection, data.name);
    await queue.addAll(data.payload);
  }

  async process(queueName: string) {
    const worker = new Worker(this.email);
    await worker.run(queueName);
  }
}
