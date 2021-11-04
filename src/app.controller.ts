import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(
    private healthCheckService: HealthCheckService,
    private mongooseHealthIndicator: MongooseHealthIndicator,
    private httpHealthIndicator: HttpHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
  ) {}

  @Get('healthz')
  @Public()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.mongooseHealthIndicator.pingCheck('database'),
    ]);
  }
}
