import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  getDbUrl() {
    return this.configService.get<string>('DATABASE_URL');
  }
}
