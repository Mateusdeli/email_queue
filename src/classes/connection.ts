import { Redis } from "ioredis";
import ConnectionConfig from "../interfaces/connection-config";
import Logger from "../utils/logger";

export default class Connection {
  constructor(private readonly config: ConnectionConfig) {}

  getConnection(): Redis {
    try {
      const connection = new Redis(this.config);
      this.handler(connection);
      return connection;
    } catch (error: any) {
      throw error;
    }
  }

  handler(connection: Redis) {
    connection.on("error", () => {
      connection.disconnect();
      Logger.log('Redis connection refused!');
    });

    connection.on("ready", () => {
        Logger.log('Connection is ready!');
    });
  }
}
