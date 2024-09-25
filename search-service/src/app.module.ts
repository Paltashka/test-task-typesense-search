import { Module } from '@nestjs/common';
import { NatsModule } from './nats.module';
import { ProductListener } from './products.listener';
import { SearchService } from './search.service';

@Module({
  imports: [NatsModule],
  controllers: [ProductListener],
  providers: [SearchService, ProductListener],
})
export class AppModule {}
