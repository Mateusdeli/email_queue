import Job from "../interfaces/mail-job";

export default class QueueData {
  constructor(
    readonly name: string,
    readonly payload: Job | Job[] | any,
  ) {}
}
