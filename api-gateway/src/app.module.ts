import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './nats.module';
import { SearchController } from './search.controller';

@Module({
  imports: [NatsModule],
  controllers: [AppController, SearchController],
  providers: [AppService],
})
export class AppModule {}
