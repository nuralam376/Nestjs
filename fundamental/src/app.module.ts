import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [StudentModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
