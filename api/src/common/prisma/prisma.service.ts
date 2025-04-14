import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  onModuleInit() {
    this.$connect()
      .then(() => this.logger.log('Connected to Postgres'))
      .catch((err) => this.logger.error('Failed to connect to Postgres', err));
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Disconnected from Postgres');
    } catch (err) {
      this.logger.error('Failed to disconnect from Postgres');
    }
  }
}
