import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('search')
export class SearchController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  async search(@Query('query') query: string) {
    if (!query) {
      return { error: 'Query parameter is required' };
    }
    return await firstValueFrom(
      this.client.send({ cmd: 'search.products' }, { query }),
    );
  }
}
