import { BulkJobOptions, JobsOptions } from "bullmq";
import MailConfiguration from "../classes/mail-sender";

export default interface MailJob {
    readonly name: string,
    readonly data: MailConfiguration,
    readonly opts?: JobsOptions | BulkJobOptions
  }