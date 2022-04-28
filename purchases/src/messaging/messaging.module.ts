import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [KafkaService],
  exports: [KafkaService], // Allow access to KafkaService outside the message module
})
export class MessagingModule {}
